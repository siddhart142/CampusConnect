import mongoose, {Schema} from "mongoose"

const experienceSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
  title: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Self Employed', 'Freelance', 'Internship', 'Trainee'],
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationType: {
    type: String,
    enum: ['On-Site', 'Hybrid', 'Remote'],
    required: true,
  },
  currentlyWorking: {
    type: Boolean,
    default: false,
  },
  startMonth: {
    type: String,
    required: true,
  },
  startYear: {
    type: String,
    required: true,
  },
  endMonth: {
    type: String,
    required: function () {
      return !this.currentlyWorking; // Required if not currently working
    },
  },
  endYear: {
    type: String,
    required: function () {
      return !this.currentlyWorking; // Required if not currently working
    },
  },
  industry: {
    type: String,
    required: true,
  },
});

export const Experience = mongoose.model('Experience', experienceSchema);

