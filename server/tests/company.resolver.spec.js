import dbHandler from './db-handler';

import { createCompany } from '../company/company.resolver';

import { CompaniesAPI } from "../company/company.data-source.js";
import companyModel from '../company/company.model';


let dataSources = {};

beforeAll(async () => {
    await dbHandler.connect();

    dataSources = { 
        companiesAPI: new CompaniesAPI(companyModel) 
    };
});

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('company resolvers', () => {

    it('should be able to create a new company', async () => {
        const companyData = {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        };

        const company = await createCompany(null, companyData, { dataSources });

        await expect(company._id).toBeDefined();
    });

    it('should not be able to create a new company with a cnpj already in use', async () => {
        const companyData = {
            name: 'AMAZON SERVICOS DE VAREJO DO BRASIL LTDA.',
            tradingName: 'AMAZON.COM.BR',
            cnpj: '15436940000103',
            address: 'Avenida Presidente Juscelino Kubitschek, 2041',
            chosenBenefits: ['vt']
        };
    
        await createCompany(null, companyData, { dataSources });
    
        await expect(
            createCompany(null, companyData, { dataSources })
        ).rejects.toBeInstanceOf(Error);
    });
});