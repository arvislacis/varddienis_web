﻿// Copyrights © 2010-2012 Arvis Lācis
// arvis.lacis@inbox.lv | http://twitter.com/arvislacis | http://varddienis.blogspot.com
/*jslint white: true, evil: true, plusplus: true, sloppy: true, indent: 4, maxerr: 50 */
/*global $: false, localStorage: false, setInterval: false, setTimeout: false, webkitNotifications: false, window: false, zina: false */

// Datu masīvi
var ned_d = ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"],
	menesi = ["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris"],
	menIn = ["janvārī", "februārī", "martā", "aprīlī", "maijā", "jūnijā", "jūlijā", "augustā", "septembrī", "oktobrī", "novembrī", "decembrī"],
	d_sk = [-1, 30, 58, 89, 119, 150, 180, 211, 242, 272, 303, 333, 364],
	plnm = {0 : 103, 52 : 92, 105 : 81, 157 : 100, 210 : 89, 263 : 107, 315 : 97, 368 : 86, 421 : 105, 473 : 94, 526 : 83, 578 : 102, 631 : 91, 684 : 80, 736 : 99, 789 : 88, 842 : 106, 894 : 96, 947 : 85},
	v = ["SolvitaLaimnesisSolvija", "IvoIndulisIvisIva", "MiervaldisRingoldsMiervalda", "IlvaSpodraIlvita", "ZintisSīmanis", "ArnitaSpulga", "ZigmārsRotaJuliānsDigmārs",
		"GatisIvanda", "KasparsAkselsAlta", "TatjanaDorisa", "SmaidaFranciska", "ReinisRenātsReinholdsReina", "HarijsĀrisAiraĀrijs", "RobertsRaitisRobertaRaits",
		"FēlikssFelicita", "LidijaLida", "TenisDravis", "AntonsAntonijsAntis", "AlnisAndulis", "OļģertsAļģirdsOrestsAļģis", "AgneseAgnijaAgne", "Austris",
		"GrietaStrautaRebeka", "KsenijaKrišsEglons", "ZigurdsSigurdsSigvards", "AnsisAgnisAgneta", "IlzeIldzeIzolde", "KārlisSpodris", "AivarsValērijs", "ValentīnaPārslaTīna",
		"TeklaVioleta", "IndraBrigitaIndarsIndris", "SonoraSpīdola", "IdaAīdaVida", "VeronikaDailaDominiks", "AgateSelgaSilgaSinilga", "DaceDārtaDora",
		"RihardsRičardsNeldaRišards", "ČeslavsAldona", "SimonaApolonija", "PaulaPaulīneJasmīna", "LaimaLaimdota", "LīnaKarlīna", "MelitaMalda", "Valentīns",
		"OlafsAloizsAlvilsOlavs", "JūlijaDžuljeta", "DonatsDonātsKonstance", "KintijaKora", "ZaneZuzanna", "VitautsSmuidraSmuidris", "EleonoraAriadne",
		"ĀrijaAdriansAdrijaAdriānaRigonda", "HaraldsAlmants", "DiānaDinaDins", "AlmaAnnemarija", "EvelīnaAurēlijaMētra", "LīvaLīvijaAndra", "SkaidrīteSkaidraJusts", "IvarsIlgvars",
		"LailaLuīzeLavīze", "TālisMartsTālavs", "AliseEnijaAuce", "AustraAurora", "VentsCentisGotfrīds", "EllaElmīra", "DagmāraMargitaMarga", "Ēvalds", "SilvijaLiliānaLaimrota",
		"KonstantīnsAgita", "AijaAivisAiva", "ErnestsBalvis", "MatildeUlrika", "ImaldaAmaldaAmilda", "GuntisGuntarsGuntris", "GerdaĢertrūdeGertrūde", "IlonaAdelīna", "JāzepsJuzefa",
		"IrbeMade", "UnaBenediktsUnigundeDzelmeBenedikta", "TamāraGabrielaGabrielsDziedra", "ŽannaMirdzaŽanete", "KazimirsIzidors", "MāraMārīteMarita", "ŽenijaEiženija",
		"GustavsGustsTālrīts", "GuntaGintaGunda", "AgijaAldonis", "IlgmārsNanijaIgmārs", "GvidoAtvars", "DagnisDagne", "IrmgardeImgarde", "DairisDaira", "ValdaHertaĀrvaldsĀrvalda",
		"VijaAivijaVidaga", "ZintaFilipsDzintaVīlips", "ZinaīdaHelmutsZina", "EdgarsDanaDanuteDans", "AllaValērijaŽubīte", "AnitaAnitraZīleAnnika", "VilmārsHermanis",
		"AinisJūlijs", "NaurisEgilsEgīls", "StraujaGudrīte", "AelitaGastons", "BernadetaMintautsAlfs", "RūdolfsRūdisViviāna", "LauraJadviga", "VēsmaFanija", "ZiedīteMirta",
		"AnastasijaMarģers", "ArmandsArmanda", "JurisJurģisGeorgs", "VisvaldisNamedaRitvaldis", "LīksmaBārbala", "AlīnaSandrisRūsiņš", "RaimondaRainaKlementīneTāle", "GundegaTerēze",
		"RaimondsVilnisLaine", "LilijaLiāna", "Ziedonis", "ZigmundsZigismundsSigmunds", "GintsUvis", "ViolaVizbulīteVijolīte", "ĢirtsĢederts", "DidzisGaidis", "HenrijsJeteHenriete",
		"StaņislavsStaņislavaStefānija", "ErvīnsEinārsKlāvs", "MaijaPaija", "MildaKarmenaManfreds", "InāraInaValijaInārs", "IrīnaIrēnaIraIraīda", "KrišjānisAivitaElvitaElfa",
		"SofijaAritaTaigaAirita", "EdvīnsEdijs", "HerbertsDailisUmberts", "IneseĒriksInesis", "LitaSibillaTeika", "SalvisVentaSelva", "IngmārsErnestīneAkvelīna",
		"Emīlijavisikalendārāneiekļautovārduīpašnieki", "LeontīneLonijaLeokādijaLigija", "IlvijaMarlēnaZiedone", "JunoraAnšlavs", "EduardsEdvardsVarisEdvarts",
		"DzidraGunitaLoretaDzidris", "VilisVilhelms", "RaivisRaivoMaksisMaksims", "LolitaVitoldsLetīcija", "AlīdaJūsma", "BirutaMairitaBernedīne", "EmmaLība", "IntaInetaIntra",
		"SintijaSindijaElfrīda", "IgorsIngvarsMargots", "IngrīdaArdis", "ArnisGaidaArno", "FrīdisFrīdaMundra", "LigitaGitaFelicijans", "AnatolijsAnatolsMalva", "IngusMairisVidvuds",
		"NoraIjaLenora", "AinārsZigrīdsUva", "SaivaTijaSantisSentisSaivis", "VilijaVitsBaņutaŽermēna", "JustīneJuta", "ArtūrsArtis", "AlbertsMadis", "ViktorsNils",
		"RasmaMairaRasa", "EmīlsEgitaMonvīds", "LudmilaLaimdotsLaimiņš", "Līga", "Jānis", "MaigaMilijaMaigone", "AusmaIngunaIngunsAusmisIngūna", "MalvīneMalvis", "ViestursKitijaViestards",
		"PēterisPaulsPaulisPāvils", "MareksTālivaldis", "ImantsIntarsIngarsRimants", "LaumaIlvarsHalina", "BenitaEveritaVeritaEmerita", "UldisSandisSandijsUlvis",
		"EdīteAndžejsEsmeraldaAndžs", "ArkādijsAnrijs", "MarutaAlda", "AntraAdeleAda", "ZaigaAsneAsna", "LijaOliversOlīvijaOdrija", "LeonoraSvens", "IntsIndriķisNamejs",
		"MargaritaMargrieta", "OskarsRitvarsAnvars", "EgonsEgijaHenrihsHenriksEgmonts", "EstereHermīne", "AleksejsAleksisAlekss", "RozālijaRoze", "JautrīteDignaKamilaSāra", "RamonaRitma",
		"MelisaMeldraMeldris", "MarijaMarinaMarikaMarī", "MērijaMagdalēnaMagdaMagone", "KristīneKristiānaKristaKristiānsKristīna", "JēkabsŽaklīna", "AnnaAnnijaAnce", "MartaDitaDite",
		"CildaCecīlija", "EdmundsEdžusVidmants", "RenārsValtersRegnārs", "RutaRūtaSigitaAngelika", "AlbīnaAlbīns", "NormundsStefans", "Augusts", "RomānsRomualdsRomualda", "OsvaldsArvils",
		"AskoldsAisma", "AlfrēdsMadarsFredis", "VladislavsMudīteVladislava", "MadaraGenovevaGenovefa", "InutaAudrisBrencis", "OlgaZitaLiegaZigita", "VizmaKlāra", "ElvīraVelgaRēzija",
		"ZelmaVirmaZemgus", "ZentaZeldaDzelde", "AstraAstrīda", "OļegsVineta", "LieneHelēnaElenaLienaEllena", "MelānijaImanta", "BorissBernhardsRojs", "LindaJanīna", "RudīteEverts",
		"VitālijsRalfsValgudis", "BoļeslavsBērtulis", "PatrīcijaIvonnaLudvigsLudisPatriks", "NatālijaBroņislavaBroņislavsTālija", "ŽanisAlensJorens", "AugusteGuste", "AigaArmīnsVismants",
		"JolantaSamantaAlvis", "AigarsVilma", "IlmārsIlutaAustrums", "ElīzaLizeteZete", "BertaBella", "DzintraDzintarsDzintara", "KlaudijaVaidaPersijs", "MaigonisMagnussMariuss",
		"RegīnaErmīns", "Ilga", "BrunoTelma", "JausmaAlbertīne", "SigneSignija", "EvitaEvaErna", "IzabellaIza", "SantaSanitaSandaSanijaSandija", "SandraGunvaldisSondraGunvaris",
		"AsjaAsnateDāgsDārgs", "VeraVairaVairis", "ElitaLiesmaAlita", "VernersMuntis", "MariannaGuntraGinters", "ModrisMatīssMariss", "MārisMaigursMārica", "VandaVenerandaVenija",
		"AgrisAgrita", "RodrigoRauls", "GundarsKurtsKnuts", "IlgonisĀdolfs", "SergejsSvetlanaLana", "MihailsMikusMiksMiķelis", "ElmaMenardaElna", "LāsmaZandaZandis", "IlmaSkaidris",
		"ElzaIlizana", "FrancisModraDmitrijs", "AmālijaAmēlija", "MonikaZilgmaZilga", "DaumantsDruvvaldis", "AinaAneteDženeta", "ElgaHelgaElgars", "ArvīdsArvisDruvis", "MontaSilvaTince",
		"KiraValfrīds", "IrmaMirga", "VilhelmīneMinna", "HelvijsHedvigaEda", "DaigaDinijaDinārs", "KarīnaGaitisGaits", "RolandsRonaldsErlendsRolanda", "ElīnaDrosmaDrosmis", "LeonīdsLeonīda",
		"UrzulaSeverīns", "ĪrisaAirisaIrīda", "DainisDainaDainida", "RenāteModrīteMudrīte", "BeāteBeatrise", "AmandaKaivaAmanta", "LilitaIritaIta", "ŅinaAntoņinaOksanaNinona",
		"LaimonisElvisElvijsElvaLaimis", "NadīnaUllaAdīna", "RinaldsValtsRinalda", "Ikars", "VivitaVivaDzīle", "ĒrikaDagnija", "AtisOtoOtomārs", "ŠarloteLote",
		"LeonsLinardsLeonardsLeonardaLeo", "LotārsHelma", "AleksandraAgra", "Teodors", "MārtiņšMārcisMarkussMarks", "OjārsNellijaRainers", "KaijaKornēlija", "JevgeņijsEižensJevgeņija",
		"FricisVikentijsVincents", "UndīneLeopoldsUnda", "GlorijaBanga", "UģisHugoUga", "AleksandrsDoloresa", "ElizabeteBetijaLīzeLiza", "AndaAndīna", "AndisZeltīte", "AldisAlfonsAldris",
		"ZigrīdaZigfrīdaZigfrīds", "VeltaVelda", "KatrīnaKateKatrīneKadrijaTrīne", "KonrādsSebastians", "LaurisNorberts", "RitaVitaOlita", "IgnatsVirgīnija", "AndrejsAndrisAndrievs",
		"ArnoldsEmanuels", "SniedzeMeta", "EvijaRaitaJogita", "BaibaBarbaraBarba", "SabīneSarmaKlaudijs", "NikolajsNiksNiklāvsNikola", "AntonijaAntaDzirkstīte", "VladimirsGunārsGunis",
		"SarmīteTabita", "GunaJudīte", "ValdisVoldemārsValdemārs", "IvetaOtīlija", "LūcijaVeldze", "AuseklisGaisma", "JanaHannaJohanna", "Alvīne", "HildaTeiksma",
		"KristapsKristersKristsKristofersKlinta", "LeldeSarmis", "ArtaMinjona", "TomsTomassSaulcerīte", "Saulvedis", "ViktorijaBalva", "IevaĀdams", "LarisaStella", "MegijaDainuvīteGija",
		"InitaElmārsHelmārs", "IngaIvitaIngeborgaIrvita", "SolveigaIlgona", "DanielsDāvisDanielaDāvidsDāniels", "KalvisSilvestrsSilvis", "SolvitaLaimnesisSolvija"],
	sv_d = {0 : "Jaungada diena",
		120 : "Darba svētki<br/>Latvijas Republikas Satversmes sapulces sasaukšanas diena",
		123 : "Latvijas Republikas Neatkarības atjaunošanas diena",
		173 : "Līgo diena",
		174 : "Jāņu diena",
		357 : "Ziemassvētku priekšvakars",
		358 : "Pirmie Ziemassvētki",
		359 : "Otrie Ziemassvētki",
		364 : "Vecgada diena"},
	at_d = {5 : "Zvaigznes diena",
		19 : "1991. gada barikāžu aizstāvju atceres diena",
		25 : "Latvijas Republikas starptautiskās <em>(de jure)</em> atzīšanas dienu",
		66 : "Starptautiskā sieviešu diena",
		72 : "Vārddieņa autora <em>(Arvja Lāča)</em> dzimšanas diena",
		83 : "Komunistiskā genocīda upuru piemiņas diena",
		127 : "Nacisma sagrāves dienu un Otrā pasaules kara upuru piemiņas diena",
		128 : "Eiropas diena",
		134 : "Starptautiskā ģimenes diena",
		136 : "Ugunsdzēsēju un glābēju diena",
		151 : "Starptautiskā bērnu aizsardzības diena",
		164 : "Komunistiskā genocīda upuru piemiņas diena",
		167 : "Latvijas Republikas okupācijas diena",
		172 : "Varoņu piemiņas diena <em>(Cēsu kaujas atceres diena)</em>",
		184 : "Ebreju tautas genocīda upuru piemiņas diena",
		222 : "Latvijas brīvības cīnītāju piemiņas diena",
		232 : "Konstitucionālā likuma \"Par Latvijas Republikas valstisko statusu\" pieņemšanas un Latvijas Republikas faktiskās neatkarības atjaunošanas diena",
		234 : "Staļinisma un nacisma upuru atceres diena",
		243 : "Zinību diena",
		264 : "Baltu vienības diena",
		273 : "Starptautiskā veco ļaužu diena",
		303 : "Helovīni",
		314 : "Lāčplēša diena",
		322 : "Starptaustiskā vīriešu diena"},
		taimeris = 0,
		crx = false,
		laiks;

// Google Chrome paplašinājuma pārbaude
if (window.webkitNotifications && window.webkitNotifications.checkPermission() === 0) {
	crx = true;

	laiks = localStorage.laiks;
	if (laiks === undefined) {
		localStorage.laiks = 900;
		laiks = 900;
	}
}

// Noformējuma un efektu fn
function nof() {
	$(".v").css({"color" : "blue", "font-weight" : "bold"});
	$(".sv").css({"color" : "darkred"});
	$(".at").css({"color" : "dargrey", "font-style" : "italic"});

	$(".datums").css({"text-align" : "left"});
	$(".laiks").css({"text-align" : "right"});
	$(".v_d, .info, .d_info, .svetki, #mdpv, #mdpv_i, #mvpd_i").css({"text-align" : "center"});

	$(".d2").css({"font-weight" : "bold"});

	$("a[href*='://']").attr({"target" : "_window"});

	if (crx) {
		$("#iest").attr({"href" : "#opcijas", "title" : ""});
	}
}

// Šodienas fn
function sodiena() {
	var d = new Date(),
		gads = d.getFullYear(),
		gada_i,
		men = d.getMonth(),
		die = d.getDate(),
		n_d = d.getDay(),
		stu = d.getHours(),
		min = d.getMinutes(),
		sek = d.getSeconds(),
		snr = d_sk[men] + die,
		sod = v[d_sk[men] + die].replace(/(?!^)[A-ZĀČĒĢĪĶĻŅŠŪŽ]/g, ", $&"),
		rit = v[d_sk[men] + die + 1].replace(/(?!^)[A-ZĀČĒĢĪĶĻŅŠŪŽ]/g, ", $&"),
		die_g,
		atl_d,
		gal1 = "šas",
		gal2 = "s",
		sve = "",
		atz = "",
		dati = Math.floor((gads / 19 - Math.floor(gads / 19)) * 1000),
		plnm_d = plnm[dati],
		plnm_s = snr - plnm_d;
	// Pareiza datuma un laika izvadīšana
	if (min < 10) {
		min = "0" + min;
	}

	if (sek < 10) {
		sek = "0" + sek;
	}

	$(".datums").html(ned_d[n_d] + ", " + gads + ". gada " + die + ". " + menesi[men]);
	$(".laiks").html(stu + ":" + min + ":" + sek);

	// Garais, īsais gads
	if (gads % 4 === 0) {
		if (gads % 100 === 0) {
			if (gads % 400 === 0) {
				gada_i = 0;
			} else {
			    gada_i = 1;
			}
		} else {
			gada_i = 0;
		}
	} else {
        gada_i = 1;
	}

	// Vārda dienu izvadīšana
	if (gada_i === 0 && men === 1 && die === 28) {
		$(".v_d").html("Šodien vārda dienu svin <span class='v'>" + sod + ".</span><br />Rīt vārda dienu neviens nesvinēs.");
	} else {
		if (gada_i === 0 && men === 1 && die === 29) {
			$(".v_d").html("Šodien vārda dienu neviens nesvin.<br/>Rīt vārda dienu svinēs <span class='v'>" + sod + ".</span>");
		} else {
			$(".v_d").html("Šodien vārda dienu svin <span class='v'>" + sod + ".</span><br />Rīt vārda dienu svinēs <span class='v'>" + rit + ".</span>");
		}
	}

	// Dienas informācija
	if (gada_i === 0) {
		if (men > 1) {
			die_g = snr + 2;
			atl_d = 366 - die_g;
		} else {
			die_g = snr + 1;
			atl_d = 366 - die_g;
		}
	} else {
		die_g = snr + 1;
		atl_d = 365 - die_g;
	}

	if (atl_d % 10 === 1 && atl_d % 100 !== 11) {
		gal1 = "si";
		gal2 = "";
	}

	$(".d_info").html("Gada <span class='d2'>" + die_g + "</span>. diena. Līdz gada beigām atliku" + gal1 + " <span class='d2'>" + atl_d + "</span> diena" + gal2 + ".");

	if (men === 2 && die > 23 && die < 31 && n_d === 6 && stu > 15) {
		$(".d_info").html($(".d_info").html() + "<br/><strong>Neaizmirstiet šonakt pagriezt pulksteņus vienu stundu uz priekšu</strong>.");
	}
	if (men === 9 && die > 23 && die < 31 && n_d === 6 && stu > 15) {
		$(".d_info").html($(".d_info").html() + "<br/><strong>Neaizmirstiet šonakt pagriezt pulksteņus vienu stundu atpakaļ</strong>.");
	}

	// Svētki
	if (sv_d[snr] !== undefined) {
		sve = sv_d[snr] + "<br/>";
	}

	if (men === 4 && die > 7 && die < 15 && n_d === 0) {
		sve = sve + "Mātes diena<br/>";
	}
	if (snr > plnm_d && plnm_s < 6 && n_d === 5) {
		sve = sve + "Lielā piektdiena<br/>";
	}
	if (snr > plnm_d && plnm_s < 8 && n_d === 0) {
		sve = sve + "Pirmās Lieldienas<br/>";
	}
	if (plnm_s > 1 && plnm_s < 9 && n_d === 1) {
		sve = sve + "Otrās Lieldienas<br/>";
	}
	if (plnm_s > 49 && plnm_s < 57 && n_d === 0) {
		sve = sve + "Vasarsvētki<br/>";
	}
	if (snr === 321) {
		sve = sve + "Latvijas Republikas Proklamēšanas diena (" + (gads - 1918) + ". gadadiena)<br/>";
	}

	if (at_d[snr] !== undefined) {
		atz = at_d[snr] + "<br/>";
	}
	if (snr > plnm_d && plnm_s < 5 && n_d === 4) {
		atz = atz + "Zaļā ceturtdiena<br/>";
	}
	if (gada_i === 1 && snr === 139) {
		atz = atz + "Tviterdiena (gada 140. diena) <a href='http://twitterday.org/lv/'>#twitterday</a><br/>";
	} else {
		if (gada_i === 0 && snr === 138) {
			atz = atz + "Tviterdiena (gada 140. diena) <a href='http://twitterday.org/lv/'>#twitterday</a><br/>";
		}
	}
	if (men === 5 && die > 14 && die < 22 && n_d === 0) {
		atz = atz + "Ugunsdzēsēju un glābēju diena<br/>";
	}
	if (men === 6 && die > 7 && die < 15 && n_d === 6) {
		atz = atz + "Jūras svētku diena<br/>";
	}
	if (men === 6 && die > 24 && n_d === 5) {
		atz = atz + "Sistēmas administratoru diena <a href='http://www.sysadminday.com'>#SysAdminDay</a><br/>";
	}
	if (men === 7 && die === 31) {
		atz = atz + "Blogotāju diena <a href='http://www.blogday.org'>#BlogDay</a><br/>";
	}
	if (men === 8 && die === 9) {
		atz = atz + "Testētāju diena<br/>";
	}
	if (gada_i === 1 && snr === 255) {
		atz = atz + "Programmētāju diena (gada 256. diena) <a href='http://www.programmerday.info'>#ProgrammerDay</a><br/>";
	} else {
		if (gada_i === 0 && snr === 254) {
			atz = atz + "Programmētāju diena (gada 256. diena) <a href='http://www.programmerday.info'>#ProgrammerDay</a><br/>";
		}
	}
	if (men === 8 && die > 7 && die < 15 && n_d === 0) {
		atz = atz + "Tēva diena<br/>";
	}
	if (men === 9 && die > 0 && die < 8 && n_d === 0) {
		atz = atz + "Skolotāju diena<br/>";
	}
	if (men === 10 && die > 7 && die < 15 && n_d === 2) {
		atz = atz + "Sociālo darbinieku diena<br/>";
	}
	if (men === 11 && die > 0 && die < 8 && n_d === 0) {
		atz = atz + "Pret latviešu tautu vērstā totalitārā komunistiskā režīma genocīda upuru piemiņas diena<br/>";
	}

	if (die === 13 && n_d === 5) {
		atz = atz + "Melnā piektdiena<br/>";
	}

	$(".svetki").html("<span class='sv'>" + sve + "</span><span class='at'>" + atz + "</span>");

	nof();

	if ((taimeris - 1) < laiks && taimeris !== 0) {
		taimeris = taimeris + 1;
	} else {
		taimeris = 1;
		zina(sod, $(".datums").html(), 7500, true);
	}

	setTimeout(sodiena, 1000);
}

// Paziņojuma fn (Google Chrome paplašinājumam)
function zina(txt, txt2, tm, mz) {
	if (crx) {
		var d = new Date(),
			logs = window.webkitNotifications.createNotification('', txt, txt2);

		logs.show();

		if (mz) {
			$("body").append("<audio src='./sound/skana.wav' autoplay='true' />");
		}

		setTimeout(function() {logs.cancel();}, tm);
	}
}

// MDPV fn
function mdpv() {
	var pv, pvm, pvp, i, i2, m, r;

	if ($("#mdpv").val() === "") {
		$("#mdpv_i").html("&nbsp;");
	} else {
		pv = $("#mdpv").val();
		pvm = pv.toLowerCase();
		pvp = pvm.charAt(0).toUpperCase() + pvm.slice(1);

		m = new RegExp(pvp + "(?=[A-ZĀČĒĢĪĶĻŅŠŪŽ]|$)");

		for (i = 0; i < 365; i++) {
			if ((r = m.exec(v[i])) !== null) {
				for (i2 = 0; i2 < 13; i2++) {
					if (i <= d_sk[i2]) {
						$("#mdpv_i").fadeOut(400, function () {
							$(this).html("<span class='v'>" + r.toString() + "</span> savu vārda dienu svin <span class='d2'>" + (i - d_sk[i2 - 1]) + ". " + menIn[i2 - 1] + "</span>.").fadeIn(800, nof());
						});
						break;
					}
				}
				break;
			}
		}

		if (i === 365) {
			$("#mdpv_i").html("<span class='v'>" + pvp + "</span> savu vārda dienu svin <span class='d2'>22. maijā</span> vai arī šāds vārds neeksistē.");
			nof();
		}
	}
}

// MVPD fn
function mvpd() {
	var d, m;

	d = parseInt($("#mvpd").val(), 0);
	m = parseInt($("#mvpm").val(), 0);

	if ((m === 4 && d === 31) || (m === 6 && d === 31) || (m === 9 && d === 31) || (m === 11 && d === 31)) {
		$("#mvpd").val(30).slider("refresh");
		d = 30;
	} else if (m === 2 && d > 28) {
		$("#mvpd").val(28).slider("refresh");
		d = 28;
	}

	$("#mvpd_i").fadeOut(400, function () {
		$(this).html("<span class='d2'>" + d + ". " + menIn[m - 1] + "</span> savu vārda dienu svin <span class='v'>"  + (v[d_sk[m - 1] + d]).replace(/(?!^)[A-ZĀČĒĢĪĶĻŅŠŪŽ]/g, ", $&") + "</span>.").fadeIn(800, nof());
	});
}

// Galvenā fn
$(function () {
	sodiena();
	nof();

	$(".info").html("");

	$("a").click(function () {
		$(this).fadeTo("slow", 0.5).fadeTo("def", 1);
	});

	$("#mdpv").keyup(function () {
		mdpv();
	});

	$("#mdpvp").click(function () {
		mdpv();
	});

	$("#msod").click(function () {
		var	d = new Date(),
			men = d.getMonth() + 1,
			die = d.getDate();

		$("#mvpd").val(die).slider("refresh");
		$("#mvpm").val(men).slider("refresh");
	});

	$("#mvpdp").click(function () {
		mvpd();
	});

	$("#opcijas").live("pagecreate", function(){
		$("#laiks").val(localStorage.laiks);
	});

	$("#saglabat").click(function (){
		localStorage.laiks = $("#laiks").val();
		laiks = $("#laiks").val();
	});
});