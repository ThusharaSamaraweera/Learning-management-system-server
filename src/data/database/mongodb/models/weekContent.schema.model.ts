import { Schema, model } from "mongoose";
import { IWeekContent } from "../../../../modules";

const WeekContentSchema: Schema<IWeekContent> = new Schema({
  weekNumber: {
    type: Number,
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  content: Schema.Types.Mixed,
  courseId: { type: String, required: true },
  description: { type: String, required: false },
  title: { type: String, required: false },
  startingDate: { type: Date, required: false },  
}, {
  timestamps: true,
});

export const WeekModelSchema = model('weekContent', WeekContentSchema)