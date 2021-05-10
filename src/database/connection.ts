import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
    const dafaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(dafaultOptions, {
            database: process.env.NODE_ENV === 'test' ? "Test" : dafaultOptions.database
        })
    )
}
