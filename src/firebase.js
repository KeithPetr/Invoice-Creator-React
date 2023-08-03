import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://invoice-creator-react-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings)
const database = getDatabase(app)
export const tasksDB = ref(database, "tasks");