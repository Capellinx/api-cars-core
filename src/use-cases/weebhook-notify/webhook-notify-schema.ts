import mongoose from "mongoose";

const historyLogSchema = new mongoose.Schema({
   message: String,
   createdAt: { type: Date, default: Date.now },
})

export const HistoryLog = mongoose.model('HistoryLog', historyLogSchema, 'history_logs')
