package entity

import "time"

type Task struct {
	TaskID           int        `json:"task_id" gorm:"task_id;"`
	FromUserID       int        `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int        `json:"to_user_id" gorm:"to_user_id;"`
	Method           string     `json:"method" gorm:"method;"`
	CurrWorkerLocation string     `json:"curr_worker_location" gorm:"curr_worker_location;"`
	MCPLocation      string     `json:"mcp_location" gorm:"mcp_location;"`
	Created_at       *time.Time `json:"created_at" gorm:"created_at;"`
	Completed_at     *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
}
type TaskCreation struct {
	TaskID           int        `json:"task_id" gorm:"task_id;"`
	FromUserID       int    `json:"from_user_id" gorm:"from_user_id;"`
	ToUserID         int    `json:"to_user_id" gorm:"to_user_id;"`
	Method           string `json:"method" gorm:"method;"`
  CurrWorkerLocation string `json:"curr_worker_location" gorm:"column:curr_worker_location;"`
	MCPLocation      string `json:"mcp_location" gorm:"mcp_location;"`
}

func (TaskCreation) TableName() string { return "task" }

type TaskUpdate struct {
	Completed_at *time.Time `json:"complete_at,omitempty" gorm:"completed_at;"`
}

func (TaskUpdate) TableName() string { return "task" }
