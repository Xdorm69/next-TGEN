import "dotenv/config";
import { connectDB } from "../MongoDB/db.js";
import { Test } from "../MongoDB/models/test.model.js";
import { Subject } from "../MongoDB/models/subject.model.js";

async function seed() {
  const subjectId = () => {
    if (!process.env.SEED_SUBJECT_ID) {
      throw new Error("SEED_SUBJECT_ID is not defined");
    }
    return process.env.SEED_SUBJECT_ID;
  };
  const authorId = () => {
    if (!process.env.SEED_USER_ID) {
      throw new Error("SEED_USER_ID is not defined");
    }
    return process.env.SEED_USER_ID;
  };

  await connectDB();

  await Test.deleteMany({ subject: subjectId() });

  const seedTest = await Test.create({
    name: "Java Fundamentals Test",
    description: "MCQs covering core Java concepts",
    subject: subjectId(),
    permissions: {
      plan: "free",
      users: [],
      price: 0,
      accessCount: "unlimited",
    },
    author: authorId(),
    questions: [
      {
        title: "What does JVM stand for?",
        difficulty: "easy",
        options: [
          { title: "Java Virtual Machine", isCorrect: true },
          { title: "Java Visual Model", isCorrect: false },
          { title: "Java Variable Manager", isCorrect: false },
          { title: "Java Vendor Machine", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which keyword is used to inherit a class in Java?",
        difficulty: "easy",
        options: [
          { title: "implements", isCorrect: false },
          { title: "extends", isCorrect: true },
          { title: "inherits", isCorrect: false },
          { title: "super", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which of these is not a Java primitive type?",
        difficulty: "easy",
        options: [
          { title: "int", isCorrect: false },
          { title: "boolean", isCorrect: false },
          { title: "String", isCorrect: true },
          { title: "double", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "What is method overloading?",
        difficulty: "medium",
        options: [
          {
            title: "Same method name with different parameters",
            isCorrect: true,
          },
          { title: "Same method name in different classes", isCorrect: false },
          {
            title: "Different methods with same return type",
            isCorrect: false,
          },
          { title: "Overriding parent class method", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which collection does not allow duplicate elements?",
        difficulty: "medium",
        options: [
          { title: "List", isCorrect: false },
          { title: "ArrayList", isCorrect: false },
          { title: "Set", isCorrect: true },
          { title: "Map", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "What is the default value of an int variable?",
        difficulty: "easy",
        options: [
          { title: "0", isCorrect: true },
          { title: "null", isCorrect: false },
          { title: "undefined", isCorrect: false },
          { title: "1", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which exception is unchecked?",
        difficulty: "medium",
        options: [
          { title: "IOException", isCorrect: false },
          { title: "SQLException", isCorrect: false },
          { title: "NullPointerException", isCorrect: true },
          { title: "FileNotFoundException", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "What does the final keyword mean for a variable?",
        difficulty: "easy",
        options: [
          { title: "Value can be changed", isCorrect: false },
          { title: "Variable cannot be reassigned", isCorrect: true },
          { title: "Variable is private", isCorrect: false },
          { title: "Variable is static", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which interface provides dynamic array behavior?",
        difficulty: "medium",
        options: [
          { title: "List", isCorrect: true },
          { title: "Set", isCorrect: false },
          { title: "Queue", isCorrect: false },
          { title: "Map", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
      {
        title: "Which keyword is used to create an object in Java?",
        difficulty: "easy",
        options: [
          { title: "class", isCorrect: false },
          { title: "new", isCorrect: true },
          { title: "this", isCorrect: false },
          { title: "object", isCorrect: false },
        ],
        tags: ["java", "fundamentals"],
      },
    ],
  });

  await Subject.findByIdAndUpdate(subjectId(), {
    $addToSet: { tests: seedTest._id },
  });


  console.log("✅ Java test seeded successfully");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
