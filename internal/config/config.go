package config

import (
	"context"
	"encoding/json"
	"jcqc/internal/db"
	"log/slog"
	"os"
	"path"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Config struct {
	DatabasePath string `json:"database_path"`
}

func Load(ctx context.Context) *Config {
	config := &Config{}

	config_bytes, err := os.ReadFile("jcqc-config.json")
	if err != nil && os.IsNotExist(err) {
		return config
	}

	if err != nil {
		slog.Error("Failed to load config", "error", err)
		panic(err)
	}

	if err := json.Unmarshal(config_bytes, config); err != nil {
		return config
	}

	return config
}

func (c *Config) setPWD(ctx context.Context) {
	var pwd string
	var err error

	for pwd == "" || err != nil {
		pwd, err = runtime.OpenDirectoryDialog(ctx, runtime.OpenDialogOptions{
			Title: "Select database/storage directory",
		})
	}

	output, err := json.Marshal(c)
	if err != nil {
		slog.Error("Failed to marshal config", "error", err)
		panic(err)
	}

	if err := os.WriteFile("jcqc-config.json", output, 0644); err != nil {
		slog.Error("Failed to write config", "error", err)
		panic(err)
	}

	c.DatabasePath = pwd
}

func (c *Config) LoadDatabase(ctx context.Context) *db.Database {
	var database *db.Database

	for c.DatabasePath == "" {
		c.setPWD(ctx)
	}

	contents, err := os.ReadFile(path.Join(c.DatabasePath, "database.json"))
	if err != nil && os.IsNotExist(err) {
		os.WriteFile(path.Join(c.DatabasePath, "database.json"), []byte("{}"), 0644)
		return &db.Database{}
	}
	if err != nil {
		slog.Error("Failed to load database", "error", err)
		return nil
	}

	if err := json.Unmarshal(contents, &database); err != nil {
		slog.Error("Failed to unmarshal database", "error", err)
		return nil
	}

	return database
}
