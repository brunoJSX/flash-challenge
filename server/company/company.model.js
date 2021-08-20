import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator'

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome da empresa é obrigatório"],
    maxlength: [100, "Nome deve possuir no máximo 100 caracteres"],
  },
  tradingName: {
    type: String,
    required: [true, "Nome fantasia é obrigatório"],
    maxlength: [100, "Nome fantasia deve possuir no máximo 100 caracteres"],
  },
  cnpj: {
    type: String,
    required: [true, "CNPJ é obrigatório"],
    match: [/^[0-9]{14}$/, "CNPJ deve possuir apenas números e 14 caracteres"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  chosenBenefits: {
    type: Array,
  },
});

CompanySchema.plugin(uniqueValidator, { message: 'deve ser único' });

export default mongoose.models.companies ||
  mongoose.model("companies", CompanySchema);
