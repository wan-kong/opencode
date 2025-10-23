import { Server } from "../../server/server"
import { cmd } from "./cmd"

export const ServeCommand = cmd({
  command: "serve",
  builder: (yargs) =>
    yargs
      .option("port", {
        alias: ["p"],
        type: "number",
        describe: "port to listen on",
        default: 0,
      })
      .option("hostname", {
        alias: ["h"],
        type: "string",
        describe: "hostname to listen on",
        default: "127.0.0.1",
      })
      .option("cwd", {
        alias: "c",
        type: "string",
        describe: "working directory",
        default: process.cwd(),
      }),
  describe: "starts a headless opencode server",
  handler: async (args) => {
    const hostname = args.hostname
    const port = args.port
    process.chdir(args.cwd)
    const server = Server.listen({
      port,
      hostname,
    })
    console.log(`opencode server listening on http://${server.hostname}:${server.port}`)
    await new Promise(() => { })
    server.stop()
  },
})
