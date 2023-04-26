package entity

type User struct {
	UserID      int    `json:"user_id" gorm:"column:user_id;"`
	Username    string `json:"username" gorm:"collumn:username;"`
	FirstName   string `json:"first_name" gorm:"collumn:first_name;"`
	LastName    string `json:"last_name" gorm:"collumn:last_name;"`
	Role        string `json:"role" gorm:"collumn:role;"`
	IsAvailable bool   `json:"is_available" gorm:"column:is_available;"`
}
type UserCreation struct {
	Username  string `json:"username" gorm:"collumn:username;"`
	FirstName string `json:"first_name" gorm:"collumn:first_name;"`
	LastName  string `json:"last_name" gorm:"collumn:last_name;"`
	Role      string `json:"role" gorm:"collumn:role;"`
}

func (UserCreation) TableName() string { return "users" }

type UserUpdate struct {
	IsAvailable *bool `json:"is_available" gorm:"is_available;"`
}

func (UserUpdate) TableName() string { return "users" }
