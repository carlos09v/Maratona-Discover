const Database = require('./config')
const Profile = require('../model/Profile')

const initDb = {
    // async = inicio do await
    async init(){


        // await / async
        const db = await Database() // ----- Iniciar Banco de Dados
        // await = esperar o banco de dados ser carregado pra n dar erro

        // -------- Criar as tabelas e os campos
        // código sql
        // Usar Crase ``
        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`)
        // AUTOINCREMENT = adicionar automaticamente
        // PRIMARY KEY = id

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`)


        // --------  Inserir os dados nos campos
        await db.run(`INSERT INTO profile (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            value_hour
        ) VALUES (
            "Carlos V.",
            "https://github.com/carlos09v.png",
            3000,
            5,
            5,
            4,
            60
        )`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        )`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "OneTwo Projects",
            3,
            47,
            1617514376018
        )`)


        await db.close() // Fechar

    }
}

initDb.init() // Executar