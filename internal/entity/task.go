package entity

import "time"

type Task struct {
	TaskID           int        `json:"task_id" gorm:"task_id;"`
	FromUserID       int        `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int        `json:"to_user_id" gorm:"to_user_id;"`
	Method           string     `json:"method" gorm:"method;"`
	CurrentWorkerLoc string     `json:"curr_worker_location" gorm:"curr_worker_location;"`
	MCPLocation      string     `json:"mcp_location" gorm:"mcp_location;"`
	Created_at       *time.Time `json:"created_at" gorm:"created_at;"`
	Completed_at     *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
	Worker_role      string     `json:"worker_role" gorm:"worker_role;"`
}
type TaskCreation struct {
	FromUserID       int    `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int    `json:"to_user_id" gorm:"to_user_id;"`
	Method           string `json:"method" gorm:"method;"`
	CurrentWorkerLoc string `json:"curr_worker_location" gorm:"curr_worker_location;"`
	MCPLocation      string `json:"mcp_location" gorm:"mcp_location;"`
	Worker_role      string `json:"worker_role" gorm:"worker_role;"`
}

func (TaskCreation) TableName() string { return "task" }

type TaskUpdate struct {
	Completed_at *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
}

func (TaskUpdate) TableName() string { return "task" }
