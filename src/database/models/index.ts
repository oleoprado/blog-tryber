import { Sequelize } from "sequelize";
import * as config from "../config/database";

export default new Sequelize(config); //retorna uma instancia de conexão com o db