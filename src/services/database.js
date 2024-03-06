import mysql from 'mysql2'

const HOST  = 'localhost';
const USER  = 'root';
const PASSWORD = 'root';
const DATABASE = 'task_schema';

const _con = mysql.createPool({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
}).promise();

export async function getTasks(status) {
    if (status) {
        const [rows] = await _con.query('SELECT * FROM tasks WHERE task_status = ?', [status]);
        return rows;
    } else {
        const [rows] = await _con.query('SELECT * FROM tasks');
        return rows;
    }
}

export async function createTask(task_des, task_status) {
    return await _con.query('INSERT INTO tasks (task_desc, task_status) VALUES (?, ?)', [task_des, task_status]);
}

export async function updateTaskStatus(task_id, task_status) {
    return await _con.query('UPDATE tasks SET task_status = ? WHERE task_id = ?', [task_status, task_id]);
}

export async function updateTaskDesc(task_id, task_desc) {
    return await _con.query('UPDATE tasks SET task_desc = ? WHERE task_id = ?', [task_desc, task_id]);
}

export async function deleteTask(task_id) {
    return await _con.query('DELETE FROM tasks WHERE task_id = ?', [task_id]);
}

// let r = await getTasks();
// let r = await createTask('I am a task', 'In Progress');
// let r = await updateTaskStatus(6, 'Done');
// let r = await updateTaskDesc(5, 'I am new task');
// let r = await deleteTask(5);
// console.log(r);