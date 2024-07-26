/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	TodoTasks = "todo_tasks",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type TodoTasksRecord = {
	details: string
	owner: RecordIdString
	title?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type TodoTasksResponse<Texpand = unknown> = Required<TodoTasksRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	todo_tasks: TodoTasksRecord
	users: UsersRecord
}

export type CollectionResponses = {
	todo_tasks: TodoTasksResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'todo_tasks'): RecordService<TodoTasksResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
