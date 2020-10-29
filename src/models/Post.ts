import { Sequelize, Model, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/env_config.js")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export class Post extends Model {
  public id!: string;
  public user_id!: string;
  public status!: number;
  public title!: string;
  public ingress: string;
  public content!: string;
  public deleted!: boolean;
  public published_date!: Date;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Post.init(
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ingress: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    content: {
      type: DataTypes.BLOB,
      allowNull: false,
      get() {
        return this.getDataValue("content").toString("utf8"); // or whatever encoding is right
      },
    },
    deleted: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: "posts",
    sequelize, // passing the `sequelize` instance is required
  }
);

export const Posts: Post[] = [];
