# Manually Installed Node Packages:

vite
typescript
mysql2
bootstrap
concurrently
express
cors

If not yet installed,

```bash
npm i vite typescript mysql2 bootstrap concurrently express cors
```

# To Start The App:

Simply use

```sh
npm run dev
```

## MySQL Script:

Highly encouraged to use the script in `./sql-script/setup.sql` for creating the database/schema **task_schema** and setting up the table **tasks** with the correct fields as well as initial records to test out.

## MySQL Database Details:

MySQL Server Version Used: 8.0.36
Port: Default (3306)
Database/Schema Name: task_schema
Table Name: tasks

Fields:
task_id INT PRIMARY KEY AUTO_INCREMENT
task_desc VARCHAR(100) NOT NULL
task_status CHAR(20) NOT NULL

**Note**: Make sure local MySQL server is starting otherwise there is an error code **'ECONNREFUSED'**

## Overall packages for this project:

├── @types/react-dom@18.2.19
├── @types/react@18.2.61
├── @typescript-eslint/eslint-plugin@7.1.0
├── @typescript-eslint/parser@7.1.0
├── @vitejs/plugin-react@4.2.1
├── bootstrap@5.3.3
├── concurrently@8.2.2
├── eslint-plugin-react-hooks@4.6.0
├── eslint-plugin-react-refresh@0.4.5
├── eslint@8.57.0
├── express@4.18.3
├── mysql2@3.9.2
├── react-dom@18.2.0
├── react@18.2.0
├── typescript@5.3.3
└── vite@5.1.4
