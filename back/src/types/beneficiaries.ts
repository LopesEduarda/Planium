import { IdGenerator } from './../services/idGenerator';
export type typeBeneficiaries = {
    name: string,
    age: number,
    price: number
}

export type imputBeneficiaries = {
    id: string,
    quantity: number,
    plan: number,
    beneficiaries: typeBeneficiaries[],
    finalPrice: number
}