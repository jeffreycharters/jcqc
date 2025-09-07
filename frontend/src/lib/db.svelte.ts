import { getContext, setContext } from "svelte"
import { LoadDatabase } from "./wailsjs/go/main/App"
import { db } from "./wailsjs/go/models"

class Database {
	data = $state<db.Database>()

	constructor() {
		LoadDatabase().then((db) => {
			this.data = db
		})

	}
}

const DB_KEY = Symbol("DB_KEY")

export function setDatabaseState() {
	return setContext(DB_KEY, new Database())
}

export function getDatabaseState() {
	return getContext<ReturnType<typeof setDatabaseState>>(DB_KEY)
}
