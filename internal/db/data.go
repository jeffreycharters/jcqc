package db

type Database struct {
	Methods     []Method
	Elements    []Element
	Instruments []Instrument
}

// ElementID represents the type used as keys in map[ElementID]float64
type ElementID struct {
	Symbol           string
	MassOrWavelength float64
}

type AnalysisMode string

const (
	MS  AnalysisMode = "mass_spectrometry"
	OES AnalysisMode = "optical_emission_spectrometry"
)

// Method represents a laboratory method
type Method struct {
	Name                   string              `json:"name"`
	Description            string              `json:"description"`
	Slug                   string              `json:"slug"`
	Active                 bool                `json:"active"`
	RpdLimit               int                 `json:"rpd_limit"`
	CalibrationCount       int                 `json:"calibration_count"`
	CheckStandardTolerance int                 `json:"check_standard_tolerance"`
	ReportSigFigs          int                 `json:"report_sig_figs"`
	AnalysisMode           AnalysisMode        `json:"analysis_mode"`
	Elements               []Element           `json:"elements,omitempty"`
	CheckStandards         []CheckStandard     `json:"check_standards,omitempty"`
	Blanks                 []Blank             `json:"blanks,omitempty"`
	ReferenceMaterials     []ReferenceMaterial `json:"reference_materials,omitempty"`
}

// Element represents a chemical element
type Element struct {
	ID               string  `json:"id"`
	Symbol           string  `json:"symbol"`
	MassOrWavelength float64 `json:"mass_or_wavelength"`
	Active           bool    `json:"active"`
}

type Unit string

const (
	PPB Unit = "ppb"
	PPM Unit = "ppm"
)

// MethodElement represents the relationship between a method and element
type MethodElement struct {
	Element string `json:"element"`
	Method  string `json:"method"`
	Units   Unit   `json:"units"`
}

// CheckStandard represents a check standard with values for different elements
type CheckStandard struct {
	ID     string                `json:"id"`
	Name   string                `json:"name"`
	Values map[ElementID]float64 `json:"values"`
}

// Blank represents a blank sample with MDLs and LOQs
type Blank struct {
	ID   string                `json:"id"`
	Name string                `json:"name"`
	MDLs map[ElementID]float64 `json:"mdls"`
	LOQs map[ElementID]float64 `json:"loqs"`
}

// ReferenceMaterial represents a reference material with upper and lower bounds
type ReferenceMaterial struct {
	ID     string                `json:"id"`
	Name   string                `json:"name"`
	Active bool                  `json:"active"`
	Method string                `json:"method"`
	Lower  map[ElementID]float64 `json:"lower"`
	Upper  map[ElementID]float64 `json:"upper"`
}

// Instrument represents a laboratory instrument
type Instrument struct {
	ID              string       `json:"id"`
	Name            string       `json:"name"`
	Mode            AnalysisMode `json:"mode"`
	AutosamplerInfo string       `json:"autosampler_info"`
	Serial          string       `json:"serial"`
	SoftwareVersion string       `json:"software_version"`
}
