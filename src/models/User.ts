import { Sequelize, Model, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export class User extends Model {
  public id!: string;
  public user_type_id!: number;
  public username!: string;
  public password!: string;
  public first_name!: string;
  public last_name!: string;
  public address: string | null;
  public zip_code: string | null;
  public city: string | null;
  public email!: string | null;
  public phone: string | null;
  public avatar: string | null;
  public disabled!: boolean;
  public banned!: boolean;
  public country_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_type_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 2,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    disabled: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    banned: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    country_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

export const Users: User[] = [];
