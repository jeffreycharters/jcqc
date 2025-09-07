import { getContext, setContext } from "svelte"
import { LoadDatabase } from "./wailsjs/go/main/App"
import { db } from "./wailsjs/go/models"

class Database {
	elements = $state<db.Element[]>([])
	methods = $state<db.Method[]>([])
	instruments = $state<db.Instrument[]>([])

	constructor() {
		LoadDatabase().then((db) => {
			this.elements = db.Elements
			this.methods = db.Methods
			this.instruments = db.Instruments
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
