package entity

type User struct {
	UserID      int    `json:"id" gorm:"column:user_id;"`
	Username    string `json:"username" gorm:"column:username;"`
	FirstName   string `json:"firstName" gorm:"column:first_name;"`
	LastName    string `json:"lastName" gorm:"column:last_name;"`
	Role        string `json:"role" gorm:"column:role;"`
	Password    string `json:"password" gorm:"column:password;"`
	IsAvailable bool   `json:"is_available" gorm:"column:is_available;"`
}
type UserCreation struct {
	UserID        int `json:"id" gorm:"column:user_id;"`
	Username  string `json:"username" gorm:"column:username;"`
	FirstName string `json:"first_name" gorm:"column:first_name;"`
	LastName  string `json:"last_name" gorm:"column:last_name;"`
	Role      string `json:"role" gorm:"column:role;"`
}

func (UserCreation) TableName() string { return "users" }

type UserUpdate struct {
	IsAvailable *bool `json:"is_available" gorm:"is_available;"`
}

func (UserUpdate) TableName() string { return "users" }
