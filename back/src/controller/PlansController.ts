import { typePlan } from './../types/plans';
import { imputBeneficiaries } from './../types/beneficiaries';
import { IdGenerator } from './../services/idGenerator';
import { Request, Response } from "express";
import plans from '../json/plans.json'
import prices from '../json/prices.json'
import beneficiaries from '../json/beneficiaries.json'
import proposals from '../json/proposals.json'
import fs from 'fs';

export default class PlansController {
    constructor(
        private IdGenerator: IdGenerator
    ) { }

    public async getPlans(req: Request, res: Response) {
        try {
            const getPlans = plans;
            // buscando os planos do arquivo json
            res.status(200).send({ getPlans })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    public async getPrices(req: Request, res: Response) {
        try {
            const getPrices = prices;
            // buscando os planos do arquivo json
            res.status(200).send({ getPrices })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    public async addBeneficiaries(req: Request, res: Response) {
        const pathBeneficiaries = "src/json/beneficiaries.json"
        const pathProposals = "src/json/proposals.json"
        // esses são os caminhos dos arquivos que serão salvas as novas informações dos beneficiários e propostas
        try {
            // adicionando um novo beneficiário

            const { quantity, plan, beneficiaries }: imputBeneficiaries = req.body
            // campos que serão enviados pelo body na requisição, com a tipagem correta dos campos que serão enviados

            if (!quantity) throw new Error(`It's necessary to fill in the number of beneficiaries that will be part of the plan!`)
            // se o campo quantidade não for preenchido, acionará essa validação e não será possível prosseguir 
            if (!plan) throw new Error(`It's necessary to choose a plan to proceed with the contracting!`)
            // se o campo preço não for preenchido, acionará essa validação e não será possível prosseguir 
            if (!beneficiaries) throw new Error(`It's necessary to fill in the information regarding the beneficiaries who will be part of the plan!`)
            // se o campo beneficiários não for preenchido, acionará essa validação e não será possível prosseguir 

            beneficiaries.forEach((b) => {
                if (!b.name || !b.age) throw new Error(`It's necessary to fill in the fields name and age of the beneficiary to proceed!`)
            })
            // passando por todos os beneficiários para verificar o preenchimento das informações necessárias(nome e idade)

            if (quantity != beneficiaries.length) throw new Error(`Please check the number of beneficiaries!`)
            // a quantidade de beneficiários não condiz com a quantidade preenchida no campo de requisição

            const beneficiariesAdd: imputBeneficiaries = {
                id: new IdGenerator().generateId(),
                quantity,
                plan,
                beneficiaries,
                finalPrice: 0
            }

            // inserindo o preço corretamente conforme a idade de cada beneficiário, tal como a quantidade de beneficiários

            const plano = plans.find((p) => {
                return p.codigo === plan
            })
            if (!plano) throw new Error(`Plan doesn't exist!`)

            const precos = prices.filter((p) => {
                return plano.codigo === p.codigo
            })

            const filterPrecos = precos.find((p) => quantity >= p.minimo_vidas)

            if (filterPrecos != null) {
                for (let i = 0; i < beneficiaries.length; i++) {
                    if (beneficiaries[i].age >= 0 && beneficiaries[i].age < 18) {
                        beneficiaries[i].price = filterPrecos.faixa1
                    } else if (beneficiaries[i].age >= 18 && beneficiaries[i].age < 41) {
                        beneficiaries[i].price = filterPrecos.faixa2
                    } else if (beneficiaries[i].age >= 41) {
                        beneficiaries[i].price = filterPrecos.faixa3
                    }

                    beneficiariesAdd.finalPrice += beneficiaries[i].price
                }
            } else {
                throw new Error(`The informed plan was not found!`)
            }

            let beneficiariesTotal: any[] = []

            const jsonBeneficiaries = {
                read() {
                    return fs.readFileSync(pathBeneficiaries, { encoding: 'utf-8' })
                },
                create() {
                    const dados = req.body
                    beneficiariesTotal.push(dados);
                    fs.writeFile(pathBeneficiaries, JSON.stringify(beneficiariesTotal), { encoding: 'utf-8', flag: 'a' }, error => {
                        if (error) console.log(error)
                    })
                }
            }
            jsonBeneficiaries.create();



            let beneficiariesPlan: any[] = []

            const jsonProposals = {
                read() {
                    return fs.readFileSync(pathProposals, { encoding: 'utf-8' })
                },
                create() {
                    beneficiariesPlan.push(beneficiariesAdd);
                    fs.writeFile(pathProposals, JSON.stringify(beneficiariesPlan), { encoding: 'utf-8', flag: 'a' }, error => {
                        if (error) console.log(error)
                    })
                }
            }
            jsonProposals.create();
            res.status(200).send({ message: this.addBeneficiaries })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    public async getBeneficiaries(req: Request, res: Response) {
        try {
            const getBeneficiaries = beneficiaries;
            // buscando os beneficiários do arquivo json
            res.status(200).send({ getBeneficiaries })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

    public async getProposals(req: Request, res: Response) {
        try {
            const getProposals = proposals;
            // buscando as propostas do arquivo json
            res.status(200).send({ getProposals })
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}