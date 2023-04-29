package entity

type Vehicle struct {
	VehicleID int     `json:"vehicle_id" gorm:"column:vehicle_id;"`
	IsFree    bool    `json:"is_free" gorm:"column:is_free;"`
	Fuel      float64 `json:"fuel" gorm:"column:fuel;"`
	Capacity  float64 `json:"capacity" gorm:"column:capacity;"`
}
