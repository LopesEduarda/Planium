import { IdGenerator } from './services/idGenerator';
import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import PlansController from "./controller/PlansController";

app.use(express.json());
app.use(cors());

const plans = new PlansController(
    new IdGenerator
)

app.get('/plans', plans.getPlans)
//exibir todos os planos

app.get('/prices', plans.getPrices)
//exibir todos os preços

app.post('/addbeneficiaries', plans.addBeneficiaries)
//criação de um novo beneficiário

app.get('/beneficiaries', plans.getBeneficiaries)
// //exibir todos os beneficiários

app.get('/proposals', plans.getProposals)
//exibir todas as propostas
