package data

import (
	"encoding/json"
	"log/slog"
	"reflect"
)

func Save[T Savable](data T, sliceType string) error {
	var out []byte

	out, err := json.Marshal(data)
	if err != nil {
		return err
	}

	filename := getFilename(data)

	slog.Info("Saving data to", "filename", filename, "length", len(out))

	// return os.WriteFile(filename, out, 0644)
	return nil
}

func getFilename[T Savable](data T) string {
	v := reflect.ValueOf(data)
	switch v.Kind() {
	case reflect.Struct:
		return v.Type().Name() + ".json"
	}

	return ""
}
