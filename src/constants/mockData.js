const MOCK_USERS = [
  {
    id: "usr-admin-01",
    badgeId: "SID-8042-FED-L4",
    name: "Supervisor Michelle Reed",
    email: "m.reed@metro-police.gov",
    phone: "+1 (555) 019-8042",
    role: "admin",
    clearanceLevel: "Tier 1",
    division: "Special Investigations Division (SID)",
    station: "Gov Core Node 04 // WDC-EAST",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXFrwX5I-ojs0_bzKit8U4oroQd_sxK_rtBPllEmizXyegMLz3VKTZZny3pn5cDcZbd6sGbaR3LYclaXJPTRTnxL6OANK_rqB0gjh2UVgyONhrTGO9jN48MyfUa-I6uaSnf62QfM42hsUp8WpO67tm3GxnmTtlKcUSC2d5ahOGFDTcknR7MEVR4Umk0GyPAUxDfRnE_u9JMncHWC7gV1O_sAwJzAwxs1-uKEWmUbOomZGJmGJWil21",
    terminalId: "WDC-TERM-094",
    fipsKeyBound: true,
    pivCardValid: true,
    tokenExpiresAt: "2026-12-31T23:59:59Z"
  },
  {
    id: "usr-agent-01",
    badgeId: "MPD-CID-8042",
    name: "Detective Jack Miller",
    email: "j.miller@metro-police.gov",
    phone: "+1 (555) 018-4492",
    role: "agent",
    clearanceLevel: "Tier 2",
    division: "Organized Crime & Narcotics Taskforce",
    station: "Detroit Metro TAC-09",
    avatarUrl: "https://lh3.googleusercontent.com/aida/AEtjO1URPUgM2f6JVTbVX2De16LxFPI7bflUQE5DEeVhQoev5Vzmb9hyj8CIL_AxVGJLt7T_gr3Bp5YP91lGYrdv0wBeB22Vuvap4Wb-wHKZHc4GrfrpptNr-Vcz98X9Q5DOzbmN6ARb_bNv7ZJUQ5zLHjQ2QgKsU0d2l_QspONzJBXK3rD79WUIWhtjyG_4OjokjJE0xVPW2RgyezSPQEVjEvn7BL-AE6NjLwaFbgmOlVLVjrfoexc3FvGzhaw",
    terminalId: "WS-8831-B",
    fipsKeyBound: true,
    pivCardValid: true,
    tokenExpiresAt: "2026-10-15T18:00:00Z"
  },
  {
    id: "usr-agent-02",
    badgeId: "FBI-SA-4109",
    name: "Special Agent Richard Vance",
    email: "r.vance@fbi.gov",
    phone: "+1 (555) 012-4109",
    role: "agent",
    clearanceLevel: "Tier 1",
    division: "Joint Terrorism Task Force / OCTI",
    station: "NY-OCTI-HUB",
    terminalId: "JTTF-NYC-102",
    fipsKeyBound: true,
    pivCardValid: true,
    tokenExpiresAt: "2026-11-20T12:00:00Z"
  }
];
const MOCK_CASES = [
  {
    id: "CR-2024-0982-A",
    caseNumber: "#CR-2024-0982-A",
    codeName: "Operation Nightshade",
    title: "Operation Nightshade \u2014 Transnational Maritime Fuel Diversion",
    summary: "Comprehensive multi-agency probe targeting illicit maritime fuel transfer, forged end-user certificates, and export-controlled dual-use avionics routing through Black Sea maritime terminals. Coordinating with FinCEN and Interpol Lyon.",
    priority: "critical",
    status: "active",
    tier: "Tier 1",
    dateOpened: "2024-01-15",
    jurisdiction: "US DIST CT (EDNY) // JTTF-OCTI",
    leadInvestigator: "SA Richard Vance",
    leadInvestigatorBadge: "#4109",
    chainOfCustodyVerified: true,
    custodyHash: "SHA-512 // 0x9f4a81b2c34d...77e9 (FIPS-140-3 Sealed)",
    lastUpdated: "14 minutes ago",
    associatedPOIs: [
      {
        id: "poi-01",
        name: "Konstantin Valkov",
        alias: "The Surveyor",
        threatLevel: "THREAT LEVEL 4",
        statusBadge: "RED NOTICE",
        role: "Syndicate Cell Leader"
      },
      {
        id: "poi-02",
        name: "Elena Cruz",
        alias: "Falcon Global Trading",
        threatLevel: "FINANCIAL BROKER",
        statusBadge: "HOTLIST FLAGGED",
        role: "Hawala Intermediary"
      },
      {
        id: "poi-03",
        name: "Viktor Rostov",
        alias: "Odessa Cell B",
        threatLevel: "MARITIME LOGISTICS",
        statusBadge: "SURVEILLED",
        role: "Terminal Operations"
      }
    ],
    evidenceFiles: [
      {
        id: "ev-01",
        name: "CDR_Dump_TowerSector04_Nov2024.csv",
        type: "cdr",
        size: "84.2 MB",
        sha256: "0xe8f9c112a4b8...31c2",
        legalStandard: "FRE 902(14)",
        uploadDate: "2024-11-08"
      },
      {
        id: "ev-02",
        name: "Falcon_Global_Hawala_Ledger_Q3.xlsx",
        type: "financial",
        size: "12.4 MB",
        sha256: "0x3b1a89c44d12...f9a0",
        legalStandard: "FINCEN-FLAG",
        uploadDate: "2024-11-07"
      },
      {
        id: "ev-03",
        name: "Wiretap_Intercept_Audio_Line44A.flac",
        type: "audio",
        size: "14.2 MB",
        sha256: "0x17c9bb42fa01...8831",
        legalStandard: "TITLE III",
        uploadDate: "2024-11-06"
      },
      {
        id: "ev-04",
        name: "ALPR_Terminal4_GateB_Capture.mp4",
        type: "video",
        size: "118.0 MB",
        sha256: "0x55d04ae88921...c10b",
        legalStandard: "CCTV-ARRAY",
        uploadDate: "2024-11-05"
      }
    ],
    milestones: [
      {
        id: "ms-01",
        timestamp: "14m ago",
        type: "sensor_alert",
        title: "Geofence Breach Detected",
        description: "Geofence breach detected at Constanta Maritime Terminal Sector 04 by Audi A6 (DC-K78-492).",
        severity: "error"
      },
      {
        id: "ms-02",
        timestamp: "Yesterday 14:22 UTC",
        type: "fincen_ledger",
        title: "Hawala Transfer Intercepted",
        description: "$84,500 Hawala transfer flagged to Beirut Clearing Broker from Al-Miraj account.",
        severity: "primary"
      },
      {
        id: "ms-03",
        timestamp: "04-Nov-2024",
        type: "judicial_warrant",
        title: "Title III Wiretap Warrant Recertified",
        description: "Title III Judicial Wiretap Warrant #EDNY-2024-819 re-certified by Federal Magistrate.",
        severity: "secondary"
      }
    ],
    notes: [
      {
        id: "nt-01",
        authorName: "SA R. Vance",
        authorBadge: "#4109",
        timestamp: "Today 09:41 EST",
        content: "POI Valkov observed arriving via black Audi A6 (DC-K78-492) meeting broker E. Cruz at dry dock 3. Title III audio confirms delivery schedule for avionics consignment.",
        signatureHash: "SHA-512: 0x994bca7...2110",
        clearanceLevel: "SEC CLEARANCE 4"
      }
    ],
    assignedAgents: [
      { id: "usr-agent-02", name: "SA Richard Vance", badge: "#4109", role: "Lead Investigator", initials: "RV" },
      { id: "usr-agent-01", name: "Det. Jack Miller", badge: "#8042", role: "Co-Investigator", initials: "JM" },
      { id: "usr-agent-03", name: "SA Maya Chen", badge: "#6211", role: "Financial Forensics", initials: "MC" }
    ]
  },
  {
    id: "CR-2023-1104-F",
    caseNumber: "#CR-2023-1104-F",
    codeName: "Operation Silent Anvil",
    title: "Operation Silent Anvil \u2014 Euro-Med Trade-Based Laundering",
    summary: "Euro-Med Trade-Based Laundering syndicate with fictitious bills of lading, synthetic diamond import over-invoicing, and cross-border bank layering across 4 European jurisdictions.",
    priority: "high",
    status: "active",
    tier: "Tier 2",
    dateOpened: "2023-11-04",
    jurisdiction: "INTERPOL / SOUTHERN DISTRICT OF FLORIDA",
    leadInvestigator: "Det. Jack Miller",
    leadInvestigatorBadge: "#8042",
    chainOfCustodyVerified: true,
    custodyHash: "SHA-512 // 0x4a11b988f01...12ce",
    lastUpdated: "3 hours ago",
    associatedPOIs: [],
    evidenceFiles: [],
    milestones: [],
    notes: [],
    assignedAgents: [
      { id: "usr-agent-01", name: "Det. Jack Miller", badge: "#8042", role: "Lead Detective", initials: "JM" }
    ]
  },
  {
    id: "CR-2024-0412-C",
    caseNumber: "#CR-2024-0412-C",
    codeName: "Red Vipers Hawala Conduit",
    title: "Red Vipers Hawala Conduit \u2014 Multi-Jurisdictional Narcotics Clearing",
    summary: "Multi-jurisdictional synthetic narcotics clearing networks and illicit shell corporations operating through pan-Balkan logistics conduits.",
    priority: "critical",
    status: "pending_indictment",
    tier: "Tier 1",
    dateOpened: "2024-04-12",
    jurisdiction: "US DIST CT (NDIL) // DEA SPECIAL OPS",
    leadInvestigator: "SA Maya Chen",
    leadInvestigatorBadge: "#6211",
    chainOfCustodyVerified: true,
    custodyHash: "SHA-512 // 0x1b89ef2399a...67f1",
    lastUpdated: "Yesterday",
    associatedPOIs: [],
    evidenceFiles: [],
    milestones: [],
    notes: [],
    assignedAgents: [
      { id: "usr-agent-03", name: "SA Maya Chen", badge: "#6211", role: "Lead Investigator", initials: "MC" }
    ]
  }
];
const MOCK_POIS = [
  {
    id: "POI-88219",
    partitionId: "DOM-SEC-0498",
    legalName: "Konstantin Jonathan Valkov",
    primaryAlias: "The Surveyor",
    aliases: ["The Surveyor", "Ghost-09", "K. V. Kozlov"],
    dob: "1979-06-14",
    gender: "male",
    nationalId: "984-21-9902",
    passportNumber: "UKR-881920B",
    telecoms: [
      { id: "tel-1", phoneNumber: "+44 7911 204918", type: "burner", imei: "358291048821901", carrier: "EE UK (Prepaid)" },
      { id: "tel-2", phoneNumber: "+40 721 904 811", type: "mobile", imei: "869201048810294", carrier: "Orange Romania" }
    ],
    emails: ["surveyor@blacksea.onion", "valkov.k@red-oak-holdings.cy"],
    dropAddresses: ["Pier B Drydock 3, Constanta Port", "Strada Mircea cel Batran 42, Sector 2"],
    biometrics: {
      heightCm: 184,
      weightKg: 82,
      eyeColor: "Steel Blue",
      hairColor: "Brown / Receding",
      distinguishingMarks: "Linear scar above right zygomatic arch; nautical star tattoo left wrist.",
      facialVectorHash: "0x88f9104c2a11b8...neural512",
      fingerprintHash: "0x12bb9401fa99c1...afis",
      biometricConfidence: 0.96
    },
    riskLevel: "critical",
    typologies: ["Transnational Organized Crime", "Financial / Hawala Network", "Narcotics Distribution"],
    remarksMO: "High operational security discipline. Employs 72-hour burner handset rotation. Avoids commercial banking, routing illicit proceeds through Cypriot shell structures and Beirut Hawala intermediaries.",
    associatedCaseIds: ["CR-2024-0982-A", "CR-2024-0412-C"],
    resolutionStatus: "resolved",
    entityMatchConfidence: 0.961,
    registrationDate: "2024-02-10",
    custodialHash: "SHA-256: 0x904a11f99c82...fips140"
  },
  {
    id: "POI-88220",
    partitionId: "DOM-SEC-0498",
    legalName: "Elena Cruz Mendez",
    primaryAlias: "The Broker",
    aliases: ["Falcon Global Trading", "E. C. Mendez"],
    dob: "1984-11-22",
    gender: "female",
    nationalId: "441-90-2819",
    passportNumber: "PAN-772911C",
    telecoms: [
      { id: "tel-3", phoneNumber: "+357 99 104821", type: "mobile", carrier: "Cyta Cyprus" }
    ],
    emails: ["elena@falcon-global.com"],
    dropAddresses: ["Avenida Balboa, Torre B, Panama City"],
    biometrics: {
      heightCm: 168,
      weightKg: 58,
      eyeColor: "Brown",
      hairColor: "Black",
      distinguishingMarks: "None recorded.",
      facialVectorHash: "0x44a199fe01c2...neural512",
      fingerprintHash: "0x77c201fa8820...afis",
      biometricConfidence: 0.91
    },
    riskLevel: "high",
    typologies: ["Financial / Hawala Network", "Transnational Organized Crime"],
    remarksMO: "Specializes in maritime freight bills of lading forgery and Hawala invoice balancing.",
    associatedCaseIds: ["CR-2024-0982-A"],
    resolutionStatus: "candidate_match",
    entityMatchConfidence: 0.884,
    registrationDate: "2024-03-01",
    custodialHash: "SHA-256: 0x12c499ba012...fips140"
  }
];
const MOCK_GRAPH_DATA = {
  caseId: "CR-2024-0982-A",
  caseName: "Operation Nightshade",
  clusterCount: 4,
  topologyState: "CONVERGED (FORCEATLAS2)",
  hashSignature: "SHA-256: e8f9...31c2",
  nodes: [
    {
      id: "node-target",
      label: "Konstantin Valkov",
      subLabel: "TARGET // Centrality: 0.961",
      type: "poi",
      riskScore: 98,
      centralityScore: 0.961,
      degree: 6,
      x: 460,
      y: 250,
      radius: 46,
      color: "#ba1a1a",
      strokeColor: "#ba1a1a",
      isTarget: true,
      metadata: { Alias: "The Surveyor", Warrants: "Interpol Red Notice", Threat: "Level 4" }
    },
    {
      id: "node-cartel",
      label: "Odessa Logistics Syndicate",
      subLabel: "Cartel Cell B [CMD-09]",
      type: "syndicate",
      riskScore: 94,
      centralityScore: 0.842,
      degree: 4,
      x: 460,
      y: 85,
      radius: 34,
      color: "#005f37",
      strokeColor: "#007a48",
      metadata: { Entity: "Transnational Syndicate", Jurisdiction: "Black Sea / Balkan" }
    },
    {
      id: "node-burner",
      label: "MSISDN: +44 7911 204918",
      subLabel: "Burner Telephony (IMEI: 3582...)",
      type: "telephony",
      riskScore: 88,
      centralityScore: 0.791,
      degree: 3,
      x: 700,
      y: 140,
      radius: 28,
      color: "#ba1a1a",
      strokeColor: "#ba1a1a",
      metadata: { Type: "Burner MSISDN", Carrier: "EE UK (Prepaid)" }
    },
    {
      id: "node-shell",
      label: "Red Oak Holdings LLC",
      subLabel: "Shell Entity (Cyprus)",
      type: "syndicate",
      riskScore: 76,
      centralityScore: 0.62,
      degree: 2,
      x: 835,
      y: 75,
      radius: 24,
      color: "#ba1a1a",
      strokeColor: "#ba1a1a",
      metadata: { RegNo: "HE-391048", Country: "Cyprus" }
    },
    {
      id: "node-vehicle",
      label: "Audi A6 (DC-K78-492)",
      subLabel: "ALPR Tracked Vehicle (Bordeaux)",
      type: "vehicle",
      riskScore: 72,
      centralityScore: 0.68,
      degree: 2,
      x: 725,
      y: 365,
      radius: 28,
      color: "#005394",
      strokeColor: "#2b6cb0",
      metadata: { Plate: "DC-K78-492", Color: "Bordeaux Navy", Hits: "18 ALPR Pings" }
    },
    {
      id: "node-safehouse",
      label: "Pier B Safehouse / Dry Dock 3",
      subLabel: "Co-Location & Weapons Cache",
      type: "safehouse",
      riskScore: 92,
      centralityScore: 0.74,
      degree: 3,
      x: 460,
      y: 435,
      radius: 28,
      color: "#555f71",
      strokeColor: "#727782",
      metadata: { Geo: "44.1792\xB0 N / 28.6498\xB0 E", Verified: "Physical Surveillance" }
    },
    {
      id: "node-broker",
      label: "Elena Cruz",
      subLabel: "Financial Broker (Panama/Odesa)",
      type: "poi",
      riskScore: 84,
      centralityScore: 0.78,
      degree: 3,
      x: 220,
      y: 380,
      radius: 30,
      color: "#005394",
      strokeColor: "#005394",
      metadata: { Role: "Hawala Dispatcher", Flag: "FinCEN Hotlist" }
    },
    {
      id: "node-hawala",
      label: "Al-Miraj Foreign Trading",
      subLabel: "Hawala Intermediary",
      type: "hawala",
      riskScore: 80,
      centralityScore: 0.65,
      degree: 2,
      x: 105,
      y: 465,
      radius: 24,
      color: "#005f37",
      strokeColor: "#007a48",
      metadata: { Volume: "$1.4M Layered", Bank: "Beirut Clearing" }
    },
    {
      id: "node-enforcer",
      label: "Dmitro 'Razor' Boyko",
      subLabel: "Enforcer / Kinetic Wing",
      type: "poi",
      riskScore: 90,
      centralityScore: 0.69,
      degree: 2,
      x: 210,
      y: 145,
      radius: 26,
      color: "#ba1a1a",
      strokeColor: "#ba1a1a",
      metadata: { Weapons: "Armed & Dangerous", Warrant: "Extradition Active" }
    }
  ],
  edges: [
    {
      id: "edge-1",
      source: "node-target",
      target: "node-cartel",
      label: "Cell B Commander",
      type: "command",
      weight: 0.95,
      isDashed: true,
      color: "#ba1a1a"
    },
    {
      id: "edge-2",
      source: "node-target",
      target: "node-burner",
      label: "Title III Intercept (14 calls)",
      type: "intercept",
      weight: 0.9,
      isDashed: true,
      color: "#ba1a1a"
    },
    {
      id: "edge-3",
      source: "node-burner",
      target: "node-shell",
      label: "Direct Dial & SMS",
      type: "intercept",
      weight: 0.7,
      isDashed: true,
      color: "#ba1a1a"
    },
    {
      id: "edge-4",
      source: "node-target",
      target: "node-vehicle",
      label: "ALPR Co-presence (<15m)",
      type: "alpr",
      weight: 0.85,
      color: "#555f71"
    },
    {
      id: "edge-5",
      source: "node-target",
      target: "node-safehouse",
      label: "Frequent Habitation",
      type: "co_location",
      weight: 0.88,
      color: "#ba1a1a"
    },
    {
      id: "edge-6",
      source: "node-target",
      target: "node-broker",
      label: "$84,500 Hawala Wire",
      type: "hawala",
      weight: 0.82,
      color: "#005394"
    },
    {
      id: "edge-7",
      source: "node-broker",
      target: "node-hawala",
      label: "Clearing Conduit",
      type: "hawala",
      weight: 0.75,
      isDashed: true,
      color: "#007a48"
    },
    {
      id: "edge-8",
      source: "node-target",
      target: "node-enforcer",
      label: "Tactical Orders",
      type: "command",
      weight: 0.78,
      isDashed: true,
      color: "#ba1a1a"
    }
  ]
};
const MOCK_CELL_TOWERS = [
  {
    id: "TOW-04-A",
    name: "Constanta Port Tower Alpha",
    sectorId: "Sector 04 // Macro 2600MHz",
    coordinate: { lat: 44.1805, lng: 28.648 },
    radiusMeters: 450,
    beamAngle: 45,
    coverageSector: 120,
    carrier: "Orange RO",
    callHitsCount: 42
  },
  {
    id: "TOW-04-B",
    name: "Sector 2 Rail Depot Terminal",
    sectorId: "Sector 02 // Micro 1800MHz",
    coordinate: { lat: 44.168, lng: 28.635 },
    radiusMeters: 320,
    beamAngle: 180,
    coverageSector: 90,
    carrier: "Vodafone RO",
    callHitsCount: 18
  }
];
const MOCK_TELEMETRY_POINTS = {
  id: "traj-valkov-01",
  entityId: "POI-88219",
  color: "#ba1a1a",
  startTime: "2024-11-08 00:00 UTC",
  endTime: "2024-11-08 06:00 UTC",
  points: [
    {
      id: "tp-1",
      entityId: "POI-88219",
      entityName: "Konstantin Valkov",
      timestamp: "01:14 UTC",
      coordinate: { lat: 44.172, lng: 28.638 },
      type: "cdr_hit",
      details: "Tower Sector 02 Ping via Burner Handset",
      speedKmh: 42
    },
    {
      id: "tp-2",
      entityId: "POI-88219",
      entityName: "Audi A6 (DC-K78-492)",
      timestamp: "02:30 UTC",
      coordinate: { lat: 44.176, lng: 28.642 },
      type: "alpr_ping",
      details: "ALPR Camera #12 Gate Sensor Trigger",
      speedKmh: 65
    },
    {
      id: "tp-3",
      entityId: "POI-88219",
      entityName: "Konstantin Valkov",
      timestamp: "03:45 UTC",
      coordinate: { lat: 44.1792, lng: 28.6498 },
      type: "geofence_breach",
      details: "Geofence Breach Sector 04 Waterfront Pier B",
      speedKmh: 12
    },
    {
      id: "tp-4",
      entityId: "POI-88219",
      entityName: "Konstantin Valkov",
      timestamp: "05:10 UTC",
      coordinate: { lat: 44.1802, lng: 28.6505 },
      type: "safehouse",
      details: "Co-location with Elena Cruz at Dry Dock 3",
      speedKmh: 0
    }
  ]
};
const MOCK_LEADS = [
  {
    id: "lead-01",
    leadCode: "LEAD-4092-A",
    caseId: "CR-2024-0982-A",
    caseName: "Operation Nightshade",
    targetEntityId: "POI-88219",
    targetEntityName: "Konstantin Valkov (The Surveyor)",
    targetRole: "Syndicate Cell Leader",
    compositeScore: 94,
    priority: "critical",
    detectedAt: "2024-11-08 03:45 UTC",
    headline: "High-Probability Pre-Shipment Meeting at Dry Dock 3",
    narrativeSummary: "Algorithmic heuristics cross-examined cellular telemetry (CDR), spatial intersection clusters, financial trails, and field reports to surface a 94% confidence lead: Burner phone (+44 7911 204918) co-located with target vehicle Audi A6 within 50m of Dry Dock 3 following an $84,500 Hawala transfer.",
    explainabilityFactors: [
      {
        name: "Cellular + CDR Co-location",
        category: "cdr_telemetry",
        contributionPercentage: 38,
        weight: 0.95,
        description: "14 burner phone calls within 200m of incident site in last 24h.",
        sourceRecordId: "CDR-TOW04-NOV24",
        courtAdmissibleStandard: "FRE 902(14)"
      },
      {
        name: "Hawala Beneficiary Correlation",
        category: "financial_wire",
        contributionPercentage: 28,
        weight: 0.88,
        description: "$84,500 wire clearance matching Beirut broker accounts.",
        sourceRecordId: "FINCEN-WIRE-9921",
        courtAdmissibleStandard: "Bank Secrecy Act / FRE 902(13)"
      },
      {
        name: "ALPR Spatial Transit Overlap",
        category: "alpr_route",
        contributionPercentage: 18,
        weight: 0.82,
        description: "License plate DC-K78-492 verified passing terminal gate within 4 minutes.",
        sourceRecordId: "ALPR-CAM12-HIT",
        courtAdmissibleStandard: "Optical Hash Validated"
      },
      {
        name: "Known Syndicate Modus Operandi",
        category: "criminal_mo",
        contributionPercentage: 10,
        weight: 0.75,
        description: "Nighttime dry dock transfers match historical 2022 Odesa seizures.",
        sourceRecordId: "MO-PROFILE-882",
        courtAdmissibleStandard: "Expert Witness Rule 702"
      }
    ],
    rawEvidenceProofHash: "SHA-256: 0x88f91002ac44...901e",
    triageStatus: "unreviewed",
    reviewTimeoutHours: 2
  },
  {
    id: "lead-02",
    leadCode: "LEAD-4088-B",
    caseId: "CR-2024-0982-A",
    caseName: "Operation Nightshade",
    targetEntityId: "POI-88220",
    targetEntityName: "Elena Cruz (Falcon Global Trading)",
    targetRole: "Financial Intermediary",
    compositeScore: 78,
    priority: "high",
    detectedAt: "2024-11-07 14:22 UTC",
    headline: "Anomalous Wire Transfer Invoicing Across Cypriot Shell",
    narrativeSummary: "Bank transaction logs flagged multiple structured remittances under the $10,000 CTR threshold routed to Red Oak Holdings LLC.",
    explainabilityFactors: [
      {
        name: "Financial Wire Trace",
        category: "financial_wire",
        contributionPercentage: 60,
        weight: 0.9,
        description: "Structured remittances to Red Oak Holdings matching invoice falsification patterns.",
        sourceRecordId: "FINCEN-CTR-098",
        courtAdmissibleStandard: "FRE 902(13)"
      }
    ],
    rawEvidenceProofHash: "SHA-256: 0x33b1904a11...440f",
    triageStatus: "unreviewed",
    reviewTimeoutHours: 6
  }
];
const MOCK_DATA_FEEDS = [
  {
    id: "feed-rms",
    name: "FIR & Incident Records Database",
    category: "rms_incident",
    protocol: "SQL",
    status: "operational",
    throughputMbSec: 42.8,
    recordsIngestedTotal: 489210,
    lastSyncTimestamp: "3 seconds ago",
    endpointUrl: "sql://fed-rms-node04.cjis.gov:5432/incident_db",
    encryptionCipher: "TLS 1.3 // AES-256-GCM",
    failedRetries24h: 0,
    pollingIntervalSeconds: 10,
    cjisCertified: true
  },
  {
    id: "feed-cdr",
    name: "Telecom CDR Ingestion Gateway",
    category: "cdr_telco",
    protocol: "STREAM",
    status: "operational",
    throughputMbSec: 68.4,
    recordsIngestedTotal: 1240980,
    lastSyncTimestamp: "1 second ago",
    endpointUrl: "kafka://cdr-stream.telco-intel.cjis.gov:9092/cdr_inbound",
    encryptionCipher: "mTLS // Ed25519 Signed",
    failedRetries24h: 0,
    pollingIntervalSeconds: 5,
    cjisCertified: true
  },
  {
    id: "feed-alpr",
    name: "Citywide Optical ALPR Camera Array",
    category: "alpr_camera",
    protocol: "RTSP",
    status: "operational",
    throughputMbSec: 32.1,
    recordsIngestedTotal: 98120,
    lastSyncTimestamp: "2 seconds ago",
    endpointUrl: "rtsp://alpr-hub.metro-transit.gov:8554/live_plates",
    encryptionCipher: "SRTP // AES-128",
    failedRetries24h: 0,
    pollingIntervalSeconds: 1,
    cjisCertified: true
  },
  {
    id: "feed-fincen",
    name: "FinCEN Financial Wire & CTR Feed",
    category: "fincen_wire",
    protocol: "REST_WEBHOOK",
    status: "operational",
    throughputMbSec: 5.1,
    recordsIngestedTotal: 14209,
    lastSyncTimestamp: "12 seconds ago",
    endpointUrl: "https://gateway.fincen.treas.gov/v2/secure_wire_inbound",
    encryptionCipher: "TLS 1.3 // RSA-4096 Authenticated",
    failedRetries24h: 0,
    pollingIntervalSeconds: 30,
    cjisCertified: true
  }
];
const MOCK_LEDGER_BLOCKS = [
  {
    blockNumber: 94821,
    blockId: "#94,821-E",
    timestampZulu: "2026-09-22 17:10:04 UTC",
    actorId: "usr-admin-01",
    actorBadge: "SID-8042-FED-L4",
    actorRole: "Admin / Dept Head",
    actionCode: "DOSSIER_EXPORT_SEAL",
    targetDocket: "#CR-2024-0982-A",
    partitionNode: "DOM-SEC-0498",
    eventHash: "0x7b1a884c901fe4b8c91029402941019488b01c9401f8910184b01fa819201948",
    previousBlockHash: "0x44a199fe01c2...0981",
    merkleLeafIndex: 0,
    complianceRule: "CJIS 5.4 / FRE 902(14)"
  },
  {
    blockNumber: 94820,
    blockId: "#94,820-E",
    timestampZulu: "2026-09-22 17:08:12 UTC",
    actorId: "usr-agent-01",
    actorBadge: "MPD-CID-8042",
    actorRole: "Field Investigator",
    actionCode: "LEAD_TRIAGE_WARRANT_PROMOTE",
    targetDocket: "#CR-2024-0982-A",
    partitionNode: "DOM-SEC-0498",
    eventHash: "0x33b1904a11440f89104c2a11b899c1fa88201fa8192019487b1a884c901fe4b8",
    previousBlockHash: "0x12bb9401fa99...3390",
    merkleLeafIndex: 1,
    complianceRule: "28 CFR Part 23"
  },
  {
    blockNumber: 94819,
    blockId: "#94,819-E",
    timestampZulu: "2026-09-22 16:55:40 UTC",
    actorId: "usr-agent-01",
    actorBadge: "MPD-CID-8042",
    actorRole: "Field Investigator",
    actionCode: "POI_REGISTRY_WRITE",
    targetDocket: "POI-88219 (Konstantin Valkov)",
    partitionNode: "DOM-SEC-0498",
    eventHash: "0x904a11f99c8211b8c91029402941019488b01c9401f8910184b01fa819201948",
    previousBlockHash: "0x88f9104c2a11...4419",
    merkleLeafIndex: 2,
    complianceRule: "CJIS 5.4 Form FORM-POI"
  },
  {
    blockNumber: 94818,
    blockId: "#94,818-E",
    timestampZulu: "2026-09-22 16:40:22 UTC",
    actorId: "feed-cdr",
    actorBadge: "INGEST-DAEMON-04",
    actorRole: "Automated Ingestion",
    actionCode: "CDR_STREAM_INGEST",
    targetDocket: "CDR-TOW04-NOV24",
    partitionNode: "DOM-SEC-0498",
    eventHash: "0xe8f9c112a4b831c288b01c9401f8910184b01fa8192019487b1a884c901fe4b8",
    previousBlockHash: "0x00f1a94b8102...8831",
    merkleLeafIndex: 3,
    complianceRule: "Title III / CJIS Ingest Audit"
  }
];
const MOCK_NOTIFICATIONS = [
  {
    id: "alert-01",
    triggerCode: "GEO-TRIGGER-4091",
    title: "CRITICAL ALERT // TIER 4: Geofence Breach",
    description: "Suspect vehicle Audi A6 (DC-K78-492) entered restricted Constanta Waterfront Pier B perimeter at 03:45 UTC.",
    severity: "critical",
    category: "geofence",
    timestamp: "14m ago",
    isRead: false,
    relatedCaseId: "CR-2024-0982-A",
    relatedEntityId: "POI-88219",
    actionLabel: "View Telemetry Map",
    actionUrl: "/agent/geo-temporal-map"
  },
  {
    id: "alert-02",
    triggerCode: "TITLE-III-HIT-88",
    title: "Title III Judicial Wiretap Hit (Line 44A)",
    description: "Voice intercept confirms consignment schedule meeting between POI Valkov and financial dispatcher Cruz.",
    severity: "high",
    category: "intercept",
    timestamp: "42m ago",
    isRead: false,
    relatedCaseId: "CR-2024-0982-A",
    actionLabel: "Inspect Docket",
    actionUrl: "/agent/cases/CR-2024-0982-A"
  },
  {
    id: "alert-03",
    triggerCode: "WARRANT-EXP-NOTICE",
    title: "Warrant Renewal Deadline Notice (Title 18 \xA7 2518)",
    description: "Judicial wiretap warrant #EDNY-2024-819 requires supervisor certification renewal within 72 hours.",
    severity: "medium",
    category: "warrants",
    timestamp: "2h ago",
    isRead: true,
    actionLabel: "Review Warrant",
    actionUrl: "/admin/dashboard"
  },
  {
    id: "alert-04",
    triggerCode: "ALPR-HOTLIST-MATCH",
    title: "Inter-Agency ALPR Hotlist Positive Match",
    description: "Plate DC-K78-492 captured by Metro Camera #12 moving eastward at 65 km/h.",
    severity: "high",
    category: "leads",
    timestamp: "3h ago",
    isRead: true,
    actionLabel: "Track Movement",
    actionUrl: "/agent/geo-temporal-map"
  }
];
const mockCases = [
  {
    id: "CASE-FED-2026-0042",
    caseNumber: "FED-2026-0042",
    title: "Operation Nightshade: Valkov Transnational Hawala Syndicate",
    classification: "18 U.S.C. \xA7 1962 (RICO)",
    priority: "CRITICAL",
    status: "ACTIVE",
    leadInvestigator: "Special Agent Marcus Vance",
    primaryJurisdiction: "USDC SDNY / EDNY Joint Command",
    summary: "Cross-jurisdictional multi-agency investigation targeting Konstantin Valkov and associated hawala remitter network operating illicit narcotics and cyber-arms laundering channels through Atlantic ports and offshore shells.",
    createdDate: "2026-01-15T08:00:00Z",
    lastUpdated: "2026-03-29T18:30:00Z",
    statutoryAuthority: "18 U.S.C. \xA7 1962 (RICO)",
    grandJuryNumber: "GJ-2026-NY-412",
    primaryPOIs: ["POI-01", "POI-02", "POI-03"],
    evidenceCount: 142,
    assignedAgents: ["FBI-89412", "DEA-88210", "NYPD-4491"]
  },
  {
    id: "CASE-FED-2026-0051",
    caseNumber: "FED-2026-0051",
    title: "Operation Ironclad: Black Sea Cyber Arms Infiltration",
    classification: "18 U.S.C. \xA7 1030 (Computer Fraud & Abuse)",
    priority: "HIGH",
    status: "ACTIVE",
    leadInvestigator: "Special Agent Elena Rostova",
    primaryJurisdiction: "USDC District of Columbia / FBI WFO",
    summary: "Investigation into unauthorized critical infrastructure malware drops, hardware token cloning, and ransomware extortion executed by state-affiliated proxies.",
    createdDate: "2026-02-01T10:00:00Z",
    lastUpdated: "2026-03-28T14:00:00Z",
    statutoryAuthority: "18 U.S.C. \xA7 1030",
    grandJuryNumber: "GJ-2026-DC-089",
    primaryPOIs: ["POI-04"],
    evidenceCount: 88,
    assignedAgents: ["FBI-89412", "USSS-2201"]
  },
  {
    id: "CASE-FED-2026-0063",
    caseNumber: "FED-2026-0063",
    title: "Operation Crosswire: Midwest Synthetic Opioid Distribution Mesh",
    classification: "21 U.S.C. \xA7 846 (Narcotics Conspiracy)",
    priority: "HIGH",
    status: "UNDER_REVIEW",
    leadInvestigator: "Task Force Officer Jack Miller",
    primaryJurisdiction: "Eastern District of Michigan / Detroit TOC-NTF",
    summary: "Interception and seizure of bulk precursor imports coordinated through encrypted VoIP networks and commercial freight lines.",
    createdDate: "2026-02-18T12:00:00Z",
    lastUpdated: "2026-03-27T09:15:00Z",
    statutoryAuthority: "21 U.S.C. \xA7 846",
    primaryPOIs: ["POI-02"],
    evidenceCount: 64,
    assignedAgents: ["MPD-CID-8042", "DEA-88210"]
  }
];
const mockPersons = [
  {
    id: "POI-01",
    fullName: "Konstantin Valkov",
    primaryAlias: "Kostya",
    aliases: ["Kostya", "The Wolf", "K. Valkov", "Valkyrie-9"],
    dateOfBirth: "1982-05-14",
    citizenship: "Russian Federation / USA (Dual)",
    fbiNumber: "FBI-994012-NY",
    threatLevel: "CRITICAL",
    status: "ACTIVE_WARRANT",
    biometrics: {
      height: `6'1"`,
      weight: "195 lbs",
      eyes: "Hazel",
      hair: "Dark Brown",
      scarsAndMarks: ["Linear 4cm scar above left orbital rim"]
    },
    associatedCases: ["FED-2026-0042"],
    knownAssociates: ["Tariq Al-Mansoor", "Elena Cruz", "Dmitro Boyko"],
    lastKnownLocation: {
      latitude: 40.758,
      longitude: -73.9855,
      address: "Midtown Manhattan, NY",
      timestamp: "2026-03-29T14:15:00Z"
    }
  },
  {
    id: "POI-02",
    fullName: "Tariq Al-Mansoor",
    primaryAlias: "The Banker",
    aliases: ["The Banker", "Abu Fahad", "T. Mansour"],
    dateOfBirth: "1979-11-20",
    citizenship: "United Arab Emirates / Cyprus",
    fbiNumber: "FINCEN-SAR-4102",
    threatLevel: "HIGH",
    status: "SURVEILLANCE_ACTIVE",
    biometrics: {
      height: `5'10"`,
      weight: "180 lbs",
      eyes: "Brown",
      hair: "Black / Graying",
      scarsAndMarks: ["Burn scar on right forearm"]
    },
    associatedCases: ["FED-2026-0042", "FED-2026-0063"],
    knownAssociates: ["Konstantin Valkov", "Elena Cruz"],
    lastKnownLocation: {
      latitude: 40.7128,
      longitude: -74.006,
      address: "Financial District, Manhattan, NY",
      timestamp: "2026-03-29T11:30:00Z"
    }
  },
  {
    id: "POI-03",
    fullName: "Elena Cruz",
    primaryAlias: "La Contadora",
    aliases: ["La Contadora", "E. Cruz", "Helen Cross"],
    dateOfBirth: "1986-03-08",
    citizenship: "Panama / Spain",
    fbiNumber: "INTERPOL-RED-8819",
    threatLevel: "HIGH",
    status: "ACTIVE_WARRANT",
    biometrics: {
      height: `5'6"`,
      weight: "135 lbs",
      eyes: "Dark Brown",
      hair: "Black",
      scarsAndMarks: ["Small tattoo behind left ear"]
    },
    associatedCases: ["FED-2026-0042"],
    knownAssociates: ["Konstantin Valkov", "Tariq Al-Mansoor"],
    lastKnownLocation: {
      latitude: 40.7282,
      longitude: -73.9942,
      address: "SoHo, Manhattan, NY",
      timestamp: "2026-03-28T19:45:00Z"
    }
  }
];
const mockLeads = [
  {
    id: "LEAD-2026-001",
    leadNumber: "LEAD-4092-A",
    headline: "Burner Telemetry Co-Location Intercept at Pier 54 Dry Dock",
    confidenceScore: 94,
    rationale: "Target burner phone IMEI 869402049182049 synchronized with secondary hawala courier handset within 15 meters radius on Tower NYC-889 Sector 2.",
    recommendedAction: "Execute Title III Intercept & Mobile Surveillance Intercept",
    assignedTo: "SA Marcus Vance (FBI-89412)",
    confidenceFactors: [
      { factor: "Cell Tower Azimuth Radiometry Match", weight: 38, source: "3GPP Telco Gateway Feed" },
      { factor: "Voiceprint Acoustic Verification (FRE 902)", weight: 32, source: "Automated Forensic Speech NLP" },
      { factor: "FinCEN Wire Transfer Time-Stamp Correlation", weight: 24, source: "SAR-2026-NY-9901" }
    ]
  },
  {
    id: "LEAD-2026-002",
    leadNumber: "LEAD-4092-B",
    headline: "Structured Wire Remittance Match from Limassol Offshore Shell",
    confidenceScore: 88,
    rationale: "Five consecutive wires totaling $49,500 structured below $10,000 threshold cleared within 48 minutes via Beirut intermediary to NYC account.",
    recommendedAction: "Freeze Hawala Destination Asset Accounts & Issue Grand Jury Subpoena",
    assignedTo: "TFO Jack Miller (MPD-CID-8042)",
    confidenceFactors: [
      { factor: "Structuring Threshold Evasion Pattern", weight: 45, source: "FinCEN Automated Ruleset" },
      { factor: "Beneficiary Entity Resolution (Jaro-Winkler 96%)", weight: 30, source: "Corporate Registry Ingestion" },
      { factor: "Prior Modus Operandi Match (Operation Nightshade)", weight: 13, source: "Historical Case Correlation" }
    ]
  },
  {
    id: "LEAD-2026-003",
    leadNumber: "LEAD-4092-C",
    headline: "ALPR Optical Detection: Suspect Vehicle Entering Waterfront Perimeter",
    confidenceScore: 82,
    rationale: "Vehicle Audi A6 registered to Valkov shell corporation captured by Port Authority Camera 14B at 03:45 Zulu.",
    recommendedAction: "Dispatch Tactical Intercept Unit & Query E-ZPass Telemetry",
    assignedTo: "SA Richard Vance (FBI-SA-4109)",
    confidenceFactors: [
      { factor: "License Plate OCR Character Confidence 99.4%", weight: 42, source: "LPR Camera Mesh Stream" },
      { factor: "Temporal Alignment with Scheduled Cargo Ship", weight: 28, source: "CBP Manifest Ingestion" },
      { factor: "Unusual Nighttime Movement Anomaly", weight: 12, source: "Pattern of Life Engine" }
    ]
  }
];
const mockNotifications = [
  {
    id: "NOTIF-01",
    title: "CRITICAL ALERT // TIER 4: Geofence Breach Detected",
    message: "Suspect vehicle Audi A6 (DC-K78-492) entered restricted Waterfront Pier B perimeter at 03:45 Zulu.",
    severity: "CRITICAL",
    timestamp: "2026-03-29T14:15:00Z",
    read: false,
    link: "/geo-temporal",
    category: "GEOFENCE"
  },
  {
    id: "NOTIF-02",
    title: "Title III Judicial Wiretap Acoustic Match (Line 44A)",
    message: "Voice intercept confirms consignment rendezvous between POI Valkov and financial dispatcher Cruz.",
    severity: "WARNING",
    timestamp: "2026-03-29T13:42:00Z",
    read: false,
    link: "/cases/CASE-FED-2026-0042",
    category: "WIRETAP"
  },
  {
    id: "NOTIF-03",
    title: "Merkle Chain Epoch #4102 Successfully Anchored",
    message: "4,102 consecutive blocks verified with zero hash deviation under CJIS \xA7 5.4 standards.",
    severity: "SUCCESS",
    timestamp: "2026-03-29T12:00:00Z",
    read: true,
    link: "/admin/audit-ledger",
    category: "AUDIT"
  },
  {
    id: "NOTIF-04",
    title: "Inter-Agency ALPR Hotlist Positive Match",
    message: "Plate DC-K78-492 captured by Metro Camera #12 moving eastward toward Queens Midtown Tunnel.",
    severity: "INFO",
    timestamp: "2026-03-29T10:18:00Z",
    read: true,
    link: "/geo-temporal",
    category: "ALPR"
  }
];
const mockAgents = [
  {
    id: "usr-admin-01",
    fullName: "Supervisor Michelle Reed",
    badgeNumber: "SID-8042-FED-L4",
    email: "m.reed@intellitrack.gov",
    agency: "FEDERAL_BUREAU_OF_INVESTIGATION",
    role: "ADMIN",
    clearanceLevel: "TOP_SECRET",
    status: "ACTIVE",
    lastLogin: "2026-03-29T14:00:00Z",
    publicKeyFingerprint: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    pivCardSerial: "PIV-9904-8172-FED"
  },
  {
    id: "usr-agent-01",
    fullName: "Special Agent Marcus Vance",
    badgeNumber: "FBI-89412",
    email: "m.vance@intellitrack.gov",
    agency: "FEDERAL_BUREAU_OF_INVESTIGATION",
    role: "AGENT",
    clearanceLevel: "CJIS_LEVEL_4",
    status: "ACTIVE",
    lastLogin: "2026-03-29T14:15:00Z",
    publicKeyFingerprint: "a4b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
    pivCardSerial: "PIV-4412-8821-FED"
  },
  {
    id: "usr-agent-02",
    fullName: "Detective Jack Miller",
    badgeNumber: "MPD-CID-8042",
    email: "j.miller@intellitrack.gov",
    agency: "DRUG_ENFORCEMENT_ADMINISTRATION",
    role: "AGENT",
    clearanceLevel: "SECRET",
    status: "ACTIVE",
    lastLogin: "2026-03-28T17:30:00Z",
    publicKeyFingerprint: "b5c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8",
    pivCardSerial: "PIV-7719-2041-FED"
  },
  {
    id: "usr-agent-03",
    fullName: "TFO Sarah Lin",
    badgeNumber: "NYPD-4491",
    email: "s.lin@intellitrack.gov",
    agency: "HOMELAND_SECURITY_INVESTIGATIONS",
    role: "AGENT",
    clearanceLevel: "LAW_ENFORCEMENT_SENSITIVE",
    status: "ACTIVE",
    lastLogin: "2026-03-27T08:00:00Z",
    publicKeyFingerprint: "c6d0e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9",
    pivCardSerial: "PIV-3312-9011-FED"
  }
];
const mockEvidence = [
  {
    id: "EV-01",
    evidenceNumber: "EVID-2026-0042-01",
    title: "Title III Audio Intercept Session #881 (Line 44A)",
    type: "AUDIO_INTERCEPT",
    fileSize: "48.2 MB",
    sha256Hash: "a3c18b76020c6a5120689b917b1b2f483d9a1f28b7e2831c2a1b2c3d4e5f6a7b",
    ingestedAt: "2026-03-29T14:10:00Z",
    custodianBadge: "FBI-89412"
  },
  {
    id: "EV-02",
    evidenceNumber: "EVID-2026-0042-02",
    title: "Tower NYC-889 Sector 2 Call Detail Records (CDR)",
    type: "TELEMETRY_LOG",
    fileSize: "124.5 MB",
    sha256Hash: "b4d29c87131d7b6231790c028c2c30594e0b2039c8f3942d3b2c3d4e5f6a7b8c",
    ingestedAt: "2026-03-29T14:15:00Z",
    custodianBadge: "FBI-89412"
  },
  {
    id: "EV-03",
    evidenceNumber: "EVID-2026-0042-03",
    title: "FinCEN Suspicious Activity Report SAR-2026-NY-9901",
    type: "FINANCIAL_SAR",
    fileSize: "4.8 MB",
    sha256Hash: "c5e30d98242e8c7342801d139d3d41605f1c3140d904a53e4c3d4e5f6a7b8c9d",
    ingestedAt: "2026-03-28T09:00:00Z",
    custodianBadge: "FINCEN-4102"
  },
  {
    id: "EV-04",
    evidenceNumber: "EVID-2026-0042-04",
    title: "Port Authority ALPR Optical Image: Audi A6 at Pier B",
    type: "ALPR_IMAGE",
    fileSize: "18.6 MB",
    sha256Hash: "d6f41ea9353f9d8453912e24ae4e5271602d4251ea15b64f5d4e5f6a7b8c9d0e",
    ingestedAt: "2026-03-29T03:45:00Z",
    custodianBadge: "USSS-2201"
  }
];
const mockAuditLogs = [
  {
    id: "AUD-001",
    timestamp: "2026-03-29T14:22:10Z",
    agentName: "SA Marcus Vance",
    badgeNumber: "FBI-89412",
    action: "Affidavit Authorization Order Entered (Title 18 \xA7 2703(d))",
    targetEntity: "Konstantin Valkov (POI-01)",
    jurisdiction: "USDC SDNY",
    sha256Hash: "a3c18b76020c6a5120689b917b1b2f483d9a1f28b7e2831c2a1b2c3d4e5f6a7b"
  },
  {
    id: "AUD-002",
    timestamp: "2026-03-29T14:15:00Z",
    agentName: "TFO Jack Miller",
    badgeNumber: "MPD-CID-8042",
    action: "CDR Telemetry Stream Bulk Ingestion Verified",
    targetEntity: "Tower Sector NYC-889",
    jurisdiction: "Detroit TOC-NTF",
    sha256Hash: "b4d29c87131d7b6231790c028c2c30594e0b2039c8f3942d3b2c3d4e5f6a7b8c"
  },
  {
    id: "AUD-003",
    timestamp: "2026-03-29T13:40:00Z",
    agentName: "Sup. Michelle Reed",
    badgeNumber: "SID-8042-FED-L4",
    action: "Lead Triage Escalated to Emergency Surveillance",
    targetEntity: "LEAD-4092-A",
    jurisdiction: "FBI HQ / WDC",
    sha256Hash: "c5e30d98242e8c7342801d139d3d41605f1c3140d904a53e4c3d4e5f6a7b8c9d"
  },
  {
    id: "AUD-004",
    timestamp: "2026-03-29T11:05:00Z",
    agentName: "SA Marcus Vance",
    badgeNumber: "FBI-89412",
    action: "Dossier Export Sealed with Bates Stamping US-DOJ-0001",
    targetEntity: "Dossier Operation Nightshade",
    jurisdiction: "USDC SDNY",
    sha256Hash: "d6f41ea9353f9d8453912e24ae4e5271602d4251ea15b64f5d4e5f6a7b8c9d0e"
  },
  {
    id: "AUD-005",
    timestamp: "2026-03-29T09:30:00Z",
    agentName: "TFO Sarah Lin",
    badgeNumber: "NYPD-4491",
    action: "Cross-Jurisdiction Identity Consolidation (Cluster #089)",
    targetEntity: "Kostya Valkov -> Konstantin Valkov",
    jurisdiction: "NYPD / DEA Joint",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  {
    id: "AUD-006",
    timestamp: "2026-03-29T08:00:00Z",
    agentName: "System CJIS Daemon",
    badgeNumber: "NODE-WDC-04",
    action: "Merkle Epoch #4102 Leaf Recalculation Complete",
    targetEntity: "Global Ledger Root",
    jurisdiction: "Federal Fusion Enclave",
    sha256Hash: "9b1d8cd98f00b204e9800998ecf8427e02d4251ea15b64f5d4e5f6a7b8c9d0e1"
  }
];
const mockDataFeeds = [
  {
    id: "FEED-01",
    name: "3GPP Cellular Telemetry & CDR Realtime Ingest",
    type: "CDR",
    status: "HEALTHY",
    recordsIngested: 248e4,
    throughput: "1.8 GB/s",
    errorRate: 1e-3,
    lastSync: "2026-03-29T14:15:00Z",
    endpoint: "kafka://cdr-stream.fed.internal:9092"
  },
  {
    id: "FEED-02",
    name: "National Incident RMS & NIBRS Repository",
    type: "RMS",
    status: "HEALTHY",
    recordsIngested: 189e4,
    throughput: "940 MB/s",
    errorRate: 0,
    lastSync: "2026-03-29T14:10:00Z",
    endpoint: "kafka://rms-broker.fed.internal:9092"
  },
  {
    id: "FEED-03",
    name: "Port Authority & Interstate ALPR Mesh",
    type: "ALPR",
    status: "HEALTHY",
    recordsIngested: 512e3,
    throughput: "1.2 GB/s",
    errorRate: 4e-3,
    lastSync: "2026-03-29T14:14:00Z",
    endpoint: "kafka://alpr-mesh.fed.internal:9092"
  },
  {
    id: "FEED-04",
    name: "FinCEN BSA / Suspicious Wire Intercept Bus",
    type: "FINCEN",
    status: "HEALTHY",
    recordsIngested: 31e3,
    throughput: "420 MB/s",
    errorRate: 0,
    lastSync: "2026-03-29T14:00:00Z",
    endpoint: "kafka://fincen-stream.fed.internal:9092"
  }
];
const mockGraphNodes = [
  { id: "node-valkov", label: "Konstantin Valkov", subLabel: "Syndicate Leader", type: "PERSON", x: 450, y: 220, radius: 26 },
  { id: "node-burner", label: "Burner #8819", subLabel: "IMEI 869402049182", type: "BURNER_PHONE", x: 310, y: 150, radius: 18 },
  { id: "node-safehouse", label: "Pier 54 Safehouse", subLabel: "Dry Dock 3", type: "SAFEHOUSE", x: 590, y: 140, radius: 18 },
  { id: "node-courier", label: "Tariq Al-Mansoor", subLabel: "Hawala Remitter", type: "PERSON", x: 680, y: 350, radius: 24 },
  { id: "node-account", label: "Al-Miraj Foreign Trading", subLabel: "Hawala Shell Co", type: "FINANCIAL_ACCOUNT", x: 790, y: 430, radius: 18 },
  { id: "node-vehicle", label: "Audi A6 (DC-K78)", subLabel: "Suspect Transport", type: "VEHICLE", x: 260, y: 340, radius: 18 },
  { id: "node-cruz", label: "Elena Cruz", subLabel: "Financial Broker", type: "PERSON", x: 380, y: 420, radius: 22 }
];
const mockGraphEdges = [
  { id: "e-1", source: "node-valkov", target: "node-burner", label: "Subscribed Telephony", relationship: "Subscriber", weight: 2.5 },
  { id: "e-2", source: "node-valkov", target: "node-safehouse", label: "Physical Frequenting", relationship: "Co-Location", weight: 2 },
  { id: "e-3", source: "node-valkov", target: "node-courier", label: "Command & Control", relationship: "Command", weight: 3 },
  { id: "e-4", source: "node-courier", target: "node-account", label: "SWIFT Beneficiary", relationship: "Financial", weight: 2.5 },
  { id: "e-5", source: "node-valkov", target: "node-vehicle", label: "Registered Operator", relationship: "Transport", weight: 2 },
  { id: "e-6", source: "node-valkov", target: "node-cruz", label: "Structured Wires", relationship: "Financial", weight: 2.5 },
  { id: "e-7", source: "node-cruz", target: "node-account", label: "Hawala Clearing", relationship: "Financial", weight: 2 }
];
export {
  MOCK_CASES,
  MOCK_CELL_TOWERS,
  MOCK_DATA_FEEDS,
  MOCK_GRAPH_DATA,
  MOCK_LEADS,
  MOCK_LEDGER_BLOCKS,
  MOCK_NOTIFICATIONS,
  MOCK_POIS,
  MOCK_TELEMETRY_POINTS,
  MOCK_USERS,
  mockAgents,
  mockAuditLogs,
  mockCases,
  mockDataFeeds,
  mockEvidence,
  mockGraphEdges,
  mockGraphNodes,
  mockLeads,
  mockNotifications,
  mockPersons
};
