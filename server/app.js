const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const fs = require("fs");
const readfile = require("./utils/readfile");
const markdown = require("markdown-it")({
  html: false,
  xhtmlOut: true,
  typographer: true,
})
  .use(require("markdown-it-anchor"), { permalink: true, permalinkBefore: true, permalinkSymbol: "#" })
  .use(require("markdown-it-toc-done-right"), { containerClass: "toc", listType: "ul" });
const app = new Koa();
const router = new Router();

app.use(cors());

router.get("/file", async (ctx) => {
  let { title } = ctx.query;
  let reuslt = null;
  if (title) {
    try {
      result = await readfile(fs, `./resource/${title}.md`);
    } catch {
      result = "error";
    }
  }
  if(result!=="error") {
    let content = markdown.render(result);
    ctx.body = {
      code: 200,
      data: content,
    };
  } else {
    ctx.body = {
      code: 400,
      data: "null",
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5200, () => {
  console.log("server is running at http://localhost:5200");
});
