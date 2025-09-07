export namespace db {
	
	export class ElementID {
	    Symbol: string;
	    MassOrWavelength: number;
	
	    static createFrom(source: any = {}) {
	        return new ElementID(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Symbol = source["Symbol"];
	        this.MassOrWavelength = source["MassOrWavelength"];
	    }
	}
	export class Blank {
	    id: string;
	    name: string;
	    mdls: Record<string, number>;
	    loqs: Record<string, number>;
	
	    static createFrom(source: any = {}) {
	        return new Blank(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.mdls = source["mdls"];
	        this.loqs = source["loqs"];
	    }
	}
	export class CheckStandard {
	    id: string;
	    name: string;
	    values: Record<string, number>;
	
	    static createFrom(source: any = {}) {
	        return new CheckStandard(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.values = source["values"];
	    }
	}
	export class Instrument {
	    id: string;
	    name: string;
	    mode: string;
	    autosampler_info: string;
	    serial: string;
	    software_version: string;
	
	    static createFrom(source: any = {}) {
	        return new Instrument(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.mode = source["mode"];
	        this.autosampler_info = source["autosampler_info"];
	        this.serial = source["serial"];
	        this.software_version = source["software_version"];
	    }
	}
	export class ReferenceMaterial {
	    id: string;
	    name: string;
	    active: boolean;
	    method: string;
	    lower: Record<string, number>;
	    upper: Record<string, number>;
	
	    static createFrom(source: any = {}) {
	        return new ReferenceMaterial(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.active = source["active"];
	        this.method = source["method"];
	        this.lower = source["lower"];
	        this.upper = source["upper"];
	    }
	}
	export class Element {
	    id: string;
	    symbol: string;
	    mass_or_wavelength: number;
	    active: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Element(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.symbol = source["symbol"];
	        this.mass_or_wavelength = source["mass_or_wavelength"];
	        this.active = source["active"];
	    }
	}
	export class Method {
	    name: string;
	    description: string;
	    slug: string;
	    active: boolean;
	    rpd_limit: number;
	    calibration_count: number;
	    check_standard_tolerance: number;
	    report_sig_figs: number;
	    analysis_mode: string;
	    elements?: Element[];
	    check_standards?: CheckStandard[];
	    blanks?: Blank[];
	    reference_materials?: ReferenceMaterial[];
	
	    static createFrom(source: any = {}) {
	        return new Method(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.slug = source["slug"];
	        this.active = source["active"];
	        this.rpd_limit = source["rpd_limit"];
	        this.calibration_count = source["calibration_count"];
	        this.check_standard_tolerance = source["check_standard_tolerance"];
	        this.report_sig_figs = source["report_sig_figs"];
	        this.analysis_mode = source["analysis_mode"];
	        this.elements = this.convertValues(source["elements"], Element);
	        this.check_standards = this.convertValues(source["check_standards"], CheckStandard);
	        this.blanks = this.convertValues(source["blanks"], Blank);
	        this.reference_materials = this.convertValues(source["reference_materials"], ReferenceMaterial);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Database {
	    methods: Method[];
	    elements: Element[];
	    instruments: Instrument[];
	
	    static createFrom(source: any = {}) {
	        return new Database(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.methods = this.convertValues(source["methods"], Method);
	        this.elements = this.convertValues(source["elements"], Element);
	        this.instruments = this.convertValues(source["instruments"], Instrument);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	
	

}

