package entity

type Troller struct {
	TrollerID int     `json:"troller_id" gorm:"column:troller_id;"`
	IsFree    bool    `json:"is_free" gorm:"column:is_free;"`
	Capacity  float64 `json:"capacity" gorm:"column:capacity;"`
}
