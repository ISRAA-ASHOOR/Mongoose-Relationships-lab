/*------------------------------ Starter Code ------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const School = require('./models/school.js');
const User  = require('./models/user.js');

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries()

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};

connect()

/*----------------------------- Query Functions -----------------------------*/

// create new school

const createSchool = async () => {
    // school id = 6716312ea53deb93ab44aa9f
  const schoolData = {
    text: "American School of Bahrain",
    isSchool: true,
  };
  const school = await School.create(schoolData);
  console.log("New school:", school);
};

const findSchool = async () => {
    const school = await School.find({}).populate("assignee");
    console.log("All schools:", school);
};

// create subtasks (for students)

const createSubtask = async () => {
    const schoolId = "67163a52a5bcd639ba47855a";
    const school = await School.findById(schoolId);
  
    const subtaskData = {
        text: "Ahmed Ali",
        isStudent: true,
    };

    const subtask = school.subtasks.push(subtaskData);
    await school.save();
    console.log("Modified school:", school);
};

// finding the subtask only 

const findSubtask = async () => {
    const schoolId = '67163a52a5bcd639ba47855a';  
    const subTaskId = '67163acf2c6a539308b49f2c'; 
  
    const school = await School.findById(schoolId);
    const subTask = school.subtasks.id(subTaskId);
  
    console.log('Subdocument:', subTask);
};

// Removing subtasks

const removeSubtask = async () => {
    const schoolId = '67163a52a5bcd639ba47855a';  
    const subTaskId = '67163acf2c6a539308b49f2c'; 
  
    const school = await School.findById(schoolId);
    school.subtasks.pull(subTaskId);
    await school.save();
  
    console.log('Updated document:', school);
};

// updating subtasks

const updateSubtask = async () => {
    const schoolId = '67163a52a5bcd639ba47855a';  
    const subTaskId = '67163aedf7403892db7bbeca'; 
  
    const school = await School.findById(schoolId);
    const subtask = school.subtasks.id(subTaskId);
  
    subtask.isStudent = true;
    await school.save();
  
    console.log('Updated document:', school);
};

// find Parent And Remove Subtask

const findParentAndRemoveSubtask = async () => {
    const school = await School.findOne({
      'subtasks.text': 'Ahmed Ali'
    });
  
    const subtask = school.subtasks.find((subTask) => {
      return subTask.text === 'Ahmed Ali'
    });
  
    subtask.deleteOne();
  
    await school.save();
    console.log('Updated school:', school);
};

// creating a user

const createUser = async () => {
    const userData = {
      name: "Zahra",
      email: "zahra@mail.com",
    };
    const user = await User.create(userData);
    console.log("New user:", user);
};

// assign school

const assignSchool = async () => {
    const schoolId = '67163a52a5bcd639ba47855a';
    const userId = '67163bec65ac06df961495e8';
  
    const updatedSchool = await School.findByIdAndUpdate(
      schoolId,
      { assignee: userId },
      { new: true }
    );
  
    console.log('Updated document:', updatedSchool);
};


/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
    console.log('Queries running.');
    // await createSchool();
    // await createSubtask();
    // await findSubtask();
    // await removeSubtask();
    // await updateSubtask();
    // await findParentAndRemoveSubtask();
    // await createUser();
    // await assignSchool();
    await findSchool();
};