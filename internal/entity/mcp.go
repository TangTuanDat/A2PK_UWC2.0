package entity

type MCP struct {
	MCPID    int     `json:"mcp_id" gorm:"column:mcp_id;"`
	Name     string  `json:"name" gorm:"column:name;"`
	Location string  `json:"location" gorm:"column:location;"`
	Capacity float64 `json:"capacity" gorm:"column:capacity;"`
	Used     float64 `json:"used" gorm:"column:used;"`
	IsFull   bool    `json:"is_full" gorm:"column:is_full;"`
}
