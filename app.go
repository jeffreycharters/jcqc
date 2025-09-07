package main

import (
	"context"
	"jcqc/internal/config"
	"jcqc/internal/db"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx    context.Context
	config *config.Config
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) loadConfig() {
	a.config = config.Load(a.ctx)
}

func (a *App) LoadDatabase() *db.Database {
	return a.config.LoadDatabase(a.ctx)
}

func (a *App) PagePrint() {
	runtime.WindowPrint(a.ctx)
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.loadConfig()
}
