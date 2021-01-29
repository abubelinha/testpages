# GBIF checklist datasets references:

- [List of Darwin Core terms](https://dwc.tdwg.org/list)
- [Darwin Core quick reference guide](https://dwc.tdwg.org/terms/)
- [Hamer, M., Victor, J. & Smith, G.F. (2012). _Best practice guide for compiling, maintaining, disseminating national species checklists_. GBIF, 40 pp, ISBN: 87-92020-48-8](https://www.gbif.org/document/80784/best-practice-guide-for-compiling-maintaining-disseminating-national-species-checklists)
- [Remsen, D.P., Robertson, T.; Döring, M. (2010). _GBIF GNA Profile Reference Guide for Darwin Core Archive_ [Core Terms and Extensions]. Version 1.2, 2012.03.15](https://www.gbif.jp/v2/pdf/gbif_gna_profile_reference_guide.pdf) + [Zenodo](https://zenodo.org/record/3463261#.YA2zA3b0lQI)
- [Remsen D., Döring M., Robertson, T., Ko, B. (2010). _Best Practices in Publishing Species Checklists_. Copenhagen: GBIF. Version 2.0, 52 pp.](http://web.archive.org/web/20150906005234/http://www.gbif.org/resource/80647) + [gbif.jp](https://www.gbif.jp/v2/pdf/checklist_how-tw.v2.pdf) + [archive.org](http://web.archive.org/web/20210124181939/https://www.gbif.jp/v2/pdf/checklist_how-tw.v2.pdf)
- [GBIF IPT wiki: Best Practices in Publishing Species Checklists, v.2.0](https://github.com/gbif/ipt/wiki/BestPracticesChecklists)

# GBIF DwCA info:
- [my own DwCA / GBIF backbone links](https://github.com/abubelinha/DwCA)

------------------------------------------------

## GBIF checklist-related issues:
- [Gheet issues & links list](https://docs.google.com/spreadsheets/d/1xwYcIbxnU3zlUJmFfBxcsvyZq0MesDXuUwRNBrL2aSU/edit#gid=0)
### IPT:
- [Advice on publishing a plant usages dataset #1485](https://github.com/gbif/ipt/issues/1485)
### GBIF PORTAL:
- [HTTP checklist datasets: citation LINK - data DATE - versions history? #3193](https://github.com/gbif/portal-feedback/issues/3193)
- [mandatory taxonID missing in checklist dataset #3215](https://github.com/gbif/portal-feedback/issues/3215)
- [how to avoid bugs in checklist pages taxonomy? ("denormalised classification" error) #3214](https://github.com/gbif/portal-feedback/issues/3214)
- [is GBIF willing to publish the Leipzig Catalogue of Vascular Plants as a GBIF checklist dataset? #3210](https://github.com/gbif/portal-feedback/issues/3210)
- []()

## GBIF interesting checklists:
- GBIF checklists search "[plant](https://www.gbif.org/dataset/search?q=plant&type=CHECKLIST)"
- [GBIF Algae classification](https://github.com/gbif/algae) aiming to fill the gaps in the current Catalog of Life due to the removal of Algaebase. Related issues in ropensci project [taxize#433](https://github.com/ropensci/taxize/issues/433#issuecomment-167071651) & [wishlist#20](https://github.com/ropensci/wishlist/issues/20).


----

dwc term  | [checklistData wiki page](https://github.com/gbif/ipt/wiki/checklistData#required-dwc-fields) | [list of core terms defined by Darwin Core](http://rs.tdwg.org/dwc/terms.htm)
-- | -- | --
TaxonID | -- | A global unique identifier for the taxon (name in a classification). Note: This term is no longer recommended for use
taxonID | Required | An identifier for the set of taxon information (data associated with the Taxon class). May be a global unique identifier or an identifier specific to the data set.
scientificName | Required | The full scientific name, with authorship and date information if known. When forming part of an Identification, this should be the name in lowest level taxonomic rank that can be determined. This term should not contain identification qualifications, which should instead be supplied in the IdentificationQualifier term.
taxonRank | Required | The taxonomic rank of the most specific name in the scientificName.
kingdom | Recommended - and other higher taxonomy if possible | The full scientific name of the kingdom in which the taxon is classified.
parentNameUsageID | Recommended - in situations where a taxonomy is meant to be published | An identifier for the name usage (documented meaning of the name according to a source) of the direct, most proximate higher-rank parent taxon (in a classification) of the most specific element of the scientificName.
acceptedNameUsageID | Recommended - in situations where a taxonomy is meant to be published | An identifier for the name usage (documented meaning of the name according to a source) of the currently valid (zoological) or accepted (botanical) taxon.
-- | -- | --

- GBIF discourse: [Toward Reliable Biodiversity Dataset References](https://discourse.gbif.org/t/toward-reliable-biodiversity-dataset-references/1637)
