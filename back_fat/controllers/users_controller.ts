// @deno-types="npm:@types/express"
import {Request, Response} from "npm:express";
import User from "../models/users_model.ts"
import Goal from "../models/goals_model.ts";
import Plan from "../models/plans_model.ts";
import { promptPlan, AIResponse } from "../utils/ai_helper.ts";
import sequelize from "../db_setup.ts";
import { ResponseHelper, updateMessage } from "../utils/response.ts";

export const getUser = async (req:Request,res:Response)=>{
    const user = await User.findOne({where:{id:req.params.id}})
    res.status(200).send(user)
}

export const createUser = async (req:Request,res:Response)=>{
    const data = req.body
    const transaction = await sequelize.transaction()
    try {
        const user = await User.create({
            username: data.username,
            email: data.email,
            password: data.password,
            birth_date: data.birth_date,
            gender: data.gender === "male",
            height: data.height,
            weight: data.weight
        },{
            transaction: transaction
        })
        data.user_id = user.id
        await Goal.create({
            user_id: user.id,
            main_goal: data.main_goal,
            baseline_activity: data.baseline_activity,
            weight_goal: data.weight_goal
        },{
            transaction: transaction
        })
        const generatedPlans:AIResponse[] = await promptPlan(data)
        await Plan.bulkCreate(generatedPlans,{validate:true,transaction:transaction})
        await transaction.commit()
        res.status(201).send(new ResponseHelper(`Sucessfully created user ${data.username}`,{id:user.id}))
    } catch (error) {
        console.error(error)
        await transaction.rollback()
        res.status(500).send(new ResponseHelper("Failed to create user"))
    }
}

export const updateUser = async (req:Request,res:Response)=>{
    const {id,...contents} = req.body
    contents.gender = contents.gender === "male" 
    const [rows] = await User.update(contents,{
        where: {
            id: Number(id)
        },
        fields: Object.keys(contents)
    })
    const {status,message} = updateMessage("User",rows)
    res.status(status).send(new ResponseHelper(message,{rowsUpdated: rows}))
    res.sendStatus(200)
}