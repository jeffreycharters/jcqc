package db

import (
	"encoding/json"
	"os"
)

func New(filename string) (*Database, error) {
	db, err := os.ReadFile(filename)
	if err != nil {
		return nil, err
	}

	var database Database
	if err := json.Unmarshal(db, &database); err != nil {
		return nil, err
	}

	return &database, nil
}
