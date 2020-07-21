---
title: Getting Started
permalink: /docs/getting-started/
layout: individualDoc
stylesheet: docs.css
previewText: >
    The first step in onboarding to StoreCat is to upload your parts list. This 5 minute guide will help you upload your initial parts and products lists.
---

# Part/Product Spreadsheet Import Documentation

The guide covers on how you can utilize hercules Product and Part Import tool for uploading your custom spreadsheet(CSV) and map them to the hercules database structure.

## Part
The complete list of the columns of Part are as follows:
```
Vendor (Required)
VendorPartNumber (Required)
DefaultVendor
ManufacturerName
ManufacturerId
ItemDetails
Description
LeadTime
DefaultFlag
ItemAttributes
UOM (Required)
Cost
MinQuantity
ItemId
PartPictureUrl
```

The Required columns must be present in you CSV and must be matched to the corresponding column while you are uploading the parts script.
The ManufacturerId if not provided, maps to the VendorPartNumber and Manufacturer if not provided, maps to the Vendor.

The uniqueness of part is on the basis of Vendor and VendorPartNumber pair. So, the spreadsheet should contain these pairs unqiue for every row. Because if the database already contains a Vendor and VendorPartNumber which is found in the spreadsheet, then it will update the corresponding row in database with the spreadsheet row.

An example csv can be found here:
[testPart.csv](/downloads/testPart.csv)
![alt text](/img/importPreview.png)
