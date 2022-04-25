import { Request, Response } from "express";
import { Articles } from "../databases/articles.db";
import { Category } from "../databases/category.db";
import slug from "slug";
import moment from "moment";
import { Comments } from "../databases/comment.db";

type reqBody = {
  title: string;
  body: string;
  categoryId: number;
};

type reqParams = {
  id : number
  slug: string;
};

type reqQuery = {
  category: string;
  page : number
};

type asyncFunc = (
  req: Request<reqParams, {}, reqBody, reqQuery>,
  res: Response
) => Promise<void>;

export const getArticle: asyncFunc = async (req, res) => {
  const { category, page } = req.query;

  const limit      = 5
  const startIndex = ( page - 1 ) * limit
  const endIndex   = page * limit

  try {

    if (category && page) {
      const data = await Articles.findAll({
        attributes: ["id", "title", "body", "slug", "createTime"],
        include: [
          {
            model: Category,
            as: "category",
            where : {
                'name' : category
            }
          },
          {
            model : Comments,
            attributes : ["name", "text", "postTime"],
            as : 'comment'
          }
          
        ]
      })

      const result = data.slice(startIndex, endIndex)
      res.status(200).send(result);

    } else {

      const data = await Articles.findAll({
        attributes: ["id", "title", "body", "slug", "createTime"],
        include: [
          {
            model: Category,
            as: "category",
          },
          {
            model : Comments,
            attributes : ["name", "text", "postTime"],
            as : 'comment'
          }
        ],
      });

      const result = data.slice(startIndex, endIndex)
      res.status(200).send(result);
    }

  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
      });
    }
  }
};

export const getSlugArticle: asyncFunc = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await Articles.findOne({
      attributes: ["id", "title", "body", "slug", "createTime"],
      include: [
        {
          model: Category,
          as: "category",
        }
      ],
      where: {
        slug: slug,
      },
    });

    res.status(200).send(data);
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
      });
    }
  }
};

export const postArticle: asyncFunc = async (req, res) => {
  const { title, body, categoryId } = req.body;
  const slugify: string = slug(title);
  const timestamps: string = moment().format("ll");

  try {
    await Articles.create({
      title: title,
      body: body,
      slug: slugify,
      createTime: timestamps,
      categoryId: categoryId,
    });
    res.status(200).json({
      message: "success create new post!",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
      });
    }
  }
};

export const updateActicle:asyncFunc = async ( req, res ) => {
  const { id } = req.params
  const { title, body } = req.body;
  const slugify: string = slug(title);

  try {
    await Articles.update({
      title : title,
      body : body,
      slug : slugify
    },{
      where : { id : id  }
    })

    res.status(200).json({
      message: 'Update!'
    })

  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
      });
    }
  }
}

export const deleteArticle:asyncFunc = async ( req, res ) => {

  const { id } = req.params

  try {
    await Articles.destroy({ 
      where : {
        id : id
      } 
  })
  res.status(200).json({
    message : 'Success deleted!'
  })

  } catch (error) {
    if (error instanceof Error) {
      res.json({
        message: error.message,
      });
    }
  }
}