import { MongooseRepository } from "../../infra/repositories/mongoose.repository";
import { ListLogsUseCase } from "./list-logs-use-case";
import { ListLogsController } from "./list-logs.controller";

const mongooseRepository = new MongooseRepository()

const listLogsUseCase = new ListLogsUseCase(mongooseRepository)

const listLogsController = new ListLogsController(listLogsUseCase)

export { listLogsController }