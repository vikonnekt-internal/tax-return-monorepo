# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

- [Schema Types](#schema-types)
  - [Query](#query)
  - [Mutation](#mutation)
  - [Objects](#objects)
    - [Asset](#asset)
    - [Benefit](#benefit)
    - [Debt](#debt)
    - [HousingLoan](#housingloan)
    - [IncomeSource](#incomesource)
    - [LoginResult](#loginresult)
    - [OtherDebt](#otherdebt)
    - [PageInfo](#pageinfo)
    - [PaginatedAssetsType](#paginatedassetstype)
    - [PaginatedBenefitsType](#paginatedbenefitstype)
    - [PaginatedDebtsType](#paginateddebtstype)
    - [PaginatedIncomeSourcesType](#paginatedincomesourcestype)
    - [PaginatedTaxReportsType](#paginatedtaxreportstype)
    - [PaginatedVehiclesType](#paginatedvehiclestype)
    - [RealEstate](#realestate)
    - [RoleGuest](#roleguest)
    - [TaxReportType](#taxreporttype)
    - [Taxpayer](#taxpayer)
    - [Token](#token)
    - [User](#user)
    - [Vehicle](#vehicle)
  - [Inputs](#inputs)
    - [CreateAssetInput](#createassetinput)
    - [CreateBenefitInput](#createbenefitinput)
    - [CreateDebtInput](#createdebtinput)
    - [CreateHousingLoanInput](#createhousingloaninput)
    - [CreateIncomeSourceInput](#createincomesourceinput)
    - [CreateOtherDebtInput](#createotherdebtinput)
    - [CreateRealEstateInput](#createrealestateinput)
    - [CreateTaxReportInput](#createtaxreportinput)
    - [CreateTaxpayerInput](#createtaxpayerinput)
    - [CreateVehicleInput](#createvehicleinput)
    - [PaginationInput](#paginationinput)
    - [ResetPasswordInput](#resetpasswordinput)
    - [UpdateAssetInput](#updateassetinput)
    - [UpdateBenefitInput](#updatebenefitinput)
    - [UpdateDebtInput](#updatedebtinput)
    - [UpdateHousingLoanInput](#updatehousingloaninput)
    - [UpdateIncomeSourceInput](#updateincomesourceinput)
    - [UpdateOtherDebtInput](#updateotherdebtinput)
    - [UpdateRealEstateInput](#updaterealestateinput)
    - [UpdateTaxReportInput](#updatetaxreportinput)
    - [UpdateTaxpayerInput](#updatetaxpayerinput)
    - [UpdateVehicleInput](#updatevehicleinput)
  - [Enums](#enums)
    - [AssetTypeEnum](#assettypeenum)
    - [DebtType](#debttype)
    - [OtherDebtType](#otherdebttype)
  - [Scalars](#scalars)
    - [Boolean](#boolean)
    - [DateTime](#datetime)
    - [Float](#float)
    - [ID](#id)
    - [Int](#int)
    - [String](#string)
    - [Upload](#upload)

</details>

## Query

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="query.asset">asset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.assets">assets</strong></td>
<td valign="top"><a href="#paginatedassetstype">PaginatedAssetsType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.benefit">benefit</strong></td>
<td valign="top"><a href="#benefit">Benefit</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.benefits">benefits</strong></td>
<td valign="top"><a href="#paginatedbenefitstype">PaginatedBenefitsType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.debt">debt</strong></td>
<td valign="top"><a href="#debt">Debt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.debts">debts</strong></td>
<td valign="top"><a href="#paginateddebtstype">PaginatedDebtsType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.housingloan">housingLoan</strong></td>
<td valign="top"><a href="#housingloan">HousingLoan</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.housingloans">housingLoans</strong></td>
<td valign="top">[<a href="#housingloan">HousingLoan</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">take</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.housingloansbytaxpayer">housingLoansByTaxpayer</strong></td>
<td valign="top">[<a href="#housingloan">HousingLoan</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxpayerId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.incomesource">incomeSource</strong></td>
<td valign="top"><a href="#incomesource">IncomeSource</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.incomesources">incomeSources</strong></td>
<td valign="top"><a href="#paginatedincomesourcestype">PaginatedIncomeSourcesType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">incomeType</td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.incomesourcesbytaxreturn">incomeSourcesByTaxReturn</strong></td>
<td valign="top"><a href="#paginatedincomesourcestype">PaginatedIncomeSourcesType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxReturnId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.incomesourcesbytaxpayer">incomeSourcesByTaxpayer</strong></td>
<td valign="top"><a href="#paginatedincomesourcestype">PaginatedIncomeSourcesType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.otherdebt">otherDebt</strong></td>
<td valign="top"><a href="#otherdebt">OtherDebt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.otherdebts">otherDebts</strong></td>
<td valign="top">[<a href="#otherdebt">OtherDebt</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxpayerId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.realestate">realEstate</strong></td>
<td valign="top"><a href="#realestate">RealEstate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.realestates">realEstates</strong></td>
<td valign="top">[<a href="#realestate">RealEstate</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxpayerId</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.sayhello">sayHello</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.taxreport">taxReport</strong></td>
<td valign="top"><a href="#taxreporttype">TaxReportType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.taxreportdetailed">taxReportDetailed</strong></td>
<td valign="top"><a href="#taxreporttype">TaxReportType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.taxreports">taxReports</strong></td>
<td valign="top"><a href="#paginatedtaxreportstype">PaginatedTaxReportsType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">paginationInput</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.taxpayer">taxpayer</strong></td>
<td valign="top"><a href="#taxpayer">Taxpayer</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.taxpayers">taxpayers</strong></td>
<td valign="top">[<a href="#taxpayer">Taxpayer</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">skip</td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">take</td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.vehicle">vehicle</strong></td>
<td valign="top"><a href="#vehicle">Vehicle</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.vehicles">vehicles</strong></td>
<td valign="top"><a href="#paginatedvehiclestype">PaginatedVehiclesType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">pagination</td>
<td valign="top"><a href="#paginationinput">PaginationInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxYear</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="query.whoami">whoAmI</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="mutation.associateincomesourceswithtaxreturn">associateIncomeSourcesWithTaxReturn</strong></td>
<td valign="top">[<a href="#incomesource">IncomeSource</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">incomeSourceIds</td>
<td valign="top">[<a href="#int">Int</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">taxReturnId</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createasset">createAsset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createAssetInput</td>
<td valign="top"><a href="#createassetinput">CreateAssetInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createbenefit">createBenefit</strong></td>
<td valign="top"><a href="#benefit">Benefit</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createBenefitInput</td>
<td valign="top"><a href="#createbenefitinput">CreateBenefitInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createdebt">createDebt</strong></td>
<td valign="top"><a href="#debt">Debt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createDebtInput</td>
<td valign="top"><a href="#createdebtinput">CreateDebtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createhousingloan">createHousingLoan</strong></td>
<td valign="top"><a href="#housingloan">HousingLoan</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createhousingloaninput">CreateHousingLoanInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createincomesource">createIncomeSource</strong></td>
<td valign="top"><a href="#incomesource">IncomeSource</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createincomesourceinput">CreateIncomeSourceInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createotherdebt">createOtherDebt</strong></td>
<td valign="top"><a href="#otherdebt">OtherDebt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createOtherDebtInput</td>
<td valign="top"><a href="#createotherdebtinput">CreateOtherDebtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createrealestate">createRealEstate</strong></td>
<td valign="top"><a href="#realestate">RealEstate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createRealEstateInput</td>
<td valign="top"><a href="#createrealestateinput">CreateRealEstateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createtaxreport">createTaxReport</strong></td>
<td valign="top"><a href="#taxreporttype">TaxReportType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">createTaxReportInput</td>
<td valign="top"><a href="#createtaxreportinput">CreateTaxReportInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createtaxpayer">createTaxpayer</strong></td>
<td valign="top"><a href="#taxpayer">Taxpayer</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createtaxpayerinput">CreateTaxpayerInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.createvehicle">createVehicle</strong></td>
<td valign="top"><a href="#vehicle">Vehicle</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#createvehicleinput">CreateVehicleInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.deletehousingloan">deleteHousingLoan</strong></td>
<td valign="top"><a href="#housingloan">HousingLoan</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.deleteincomesource">deleteIncomeSource</strong></td>
<td valign="top"><a href="#incomesource">IncomeSource</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.deletetaxpayer">deleteTaxpayer</strong></td>
<td valign="top"><a href="#taxpayer">Taxpayer</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.deletevehicle">deleteVehicle</strong></td>
<td valign="top"><a href="#vehicle">Vehicle</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.loginadmin">loginAdmin</strong></td>
<td valign="top"><a href="#loginresult">LoginResult</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removeasset">removeAsset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removebenefit">removeBenefit</strong></td>
<td valign="top"><a href="#benefit">Benefit</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removedebt">removeDebt</strong></td>
<td valign="top"><a href="#debt">Debt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removeotherdebt">removeOtherDebt</strong></td>
<td valign="top"><a href="#otherdebt">OtherDebt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removerealestate">removeRealEstate</strong></td>
<td valign="top"><a href="#realestate">RealEstate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.removetaxreport">removeTaxReport</strong></td>
<td valign="top"><a href="#taxreporttype">TaxReportType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.resetpassword">resetPassword</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#resetpasswordinput">ResetPasswordInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.sendresetpasswordemail">sendResetPasswordEmail</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updateasset">updateAsset</strong></td>
<td valign="top"><a href="#asset">Asset</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateAssetInput</td>
<td valign="top"><a href="#updateassetinput">UpdateAssetInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatebenefit">updateBenefit</strong></td>
<td valign="top"><a href="#benefit">Benefit</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateBenefitInput</td>
<td valign="top"><a href="#updatebenefitinput">UpdateBenefitInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatedebt">updateDebt</strong></td>
<td valign="top"><a href="#debt">Debt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateDebtInput</td>
<td valign="top"><a href="#updatedebtinput">UpdateDebtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatehousingloan">updateHousingLoan</strong></td>
<td valign="top"><a href="#housingloan">HousingLoan</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updatehousingloaninput">UpdateHousingLoanInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updateincomesource">updateIncomeSource</strong></td>
<td valign="top"><a href="#incomesource">IncomeSource</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updateincomesourceinput">UpdateIncomeSourceInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updateotherdebt">updateOtherDebt</strong></td>
<td valign="top"><a href="#otherdebt">OtherDebt</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateOtherDebtInput</td>
<td valign="top"><a href="#updateotherdebtinput">UpdateOtherDebtInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updaterealestate">updateRealEstate</strong></td>
<td valign="top"><a href="#realestate">RealEstate</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateRealEstateInput</td>
<td valign="top"><a href="#updaterealestateinput">UpdateRealEstateInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatetaxreport">updateTaxReport</strong></td>
<td valign="top"><a href="#taxreporttype">TaxReportType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">updateTaxReportInput</td>
<td valign="top"><a href="#updatetaxreportinput">UpdateTaxReportInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatetaxpayer">updateTaxpayer</strong></td>
<td valign="top"><a href="#taxpayer">Taxpayer</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updatetaxpayerinput">UpdateTaxpayerInput</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="mutation.updatevehicle">updateVehicle</strong></td>
<td valign="top"><a href="#vehicle">Vehicle</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">input</td>
<td valign="top"><a href="#updatevehicleinput">UpdateVehicleInput</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Objects

### Asset

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="asset.assettype">assetType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.realestate">realEstate</strong></td>
<td valign="top"><a href="#realestate">RealEstate</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.realestateid">realEstateId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.vehicle">vehicle</strong></td>
<td valign="top"><a href="#vehicle">Vehicle</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="asset.vehicleid">vehicleId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### Benefit

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="benefit.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.benefittype">benefitType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.createdat">createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.description">description</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.providername">providerName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="benefit.updatedat">updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Debt

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="debt.createdat">createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.creditorname">creditorName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.debttype">debtType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.housingloan">housingLoan</strong></td>
<td valign="top"><a href="#housingloan">HousingLoan</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.otherdebt">otherDebt</strong></td>
<td valign="top"><a href="#otherdebt">OtherDebt</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="debt.updatedat">updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### HousingLoan

housing loan

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.annualpayments">annualPayments</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.lenderid">lenderId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.lendername">lenderName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.loandate">loanDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.loannumber">loanNumber</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.loantermyears">loanTermYears</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.principalrepayment">principalRepayment</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.propertyaddress">propertyAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="housingloan.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### IncomeSource

income source

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.incometype">incomeType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.sourceidnumber">sourceIdNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.sourcename">sourceName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="incomesource.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### LoginResult

LoginResult

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="loginresult.data">data</strong></td>
<td valign="top"><a href="#user">User</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="loginresult.token">token</strong></td>
<td valign="top"><a href="#token">Token</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### OtherDebt

other debt

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.creditorname">creditorName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.debtidentifier">debtIdentifier</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.debttype">debtType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="otherdebt.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PageInfo

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="pageinfo.endcursor">endCursor</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="pageinfo.hasnextpage">hasNextPage</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="pageinfo.haspreviouspage">hasPreviousPage</strong></td>
<td valign="top"><a href="#boolean">Boolean</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="pageinfo.startcursor">startCursor</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedAssetsType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginatedassetstype.data">data</strong></td>
<td valign="top">[<a href="#asset">Asset</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedassetstype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedassetstype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedBenefitsType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginatedbenefitstype.data">data</strong></td>
<td valign="top">[<a href="#benefit">Benefit</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedbenefitstype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedbenefitstype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedDebtsType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginateddebtstype.data">data</strong></td>
<td valign="top">[<a href="#debt">Debt</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginateddebtstype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginateddebtstype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedIncomeSourcesType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginatedincomesourcestype.data">data</strong></td>
<td valign="top">[<a href="#incomesource">IncomeSource</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedincomesourcestype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedincomesourcestype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedTaxReportsType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginatedtaxreportstype.data">data</strong></td>
<td valign="top">[<a href="#taxreporttype">TaxReportType</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedtaxreportstype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedtaxreportstype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginatedVehiclesType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginatedvehiclestype.data">data</strong></td>
<td valign="top">[<a href="#vehicle">Vehicle</a>!]!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedvehiclestype.pageinfo">pageInfo</strong></td>
<td valign="top"><a href="#pageinfo">PageInfo</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginatedvehiclestype.totalcount">totalCount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### RealEstate

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="realestate.address">address</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.propertyvalue">propertyValue</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="realestate.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### RoleGuest

RoleGuest

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="roleguest.accounttype">accountType</strong></td>
<td valign="top">[<a href="#string">String</a>!]!</td>
<td></td>
</tr>
</tbody>
</table>

### TaxReportType

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.assets">assets</strong></td>
<td valign="top">[<a href="#asset">Asset</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.benefits">benefits</strong></td>
<td valign="top">[<a href="#benefit">Benefit</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.debts">debts</strong></td>
<td valign="top">[<a href="#debt">Debt</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.incomesources">incomeSources</strong></td>
<td valign="top">[<a href="#incomesource">IncomeSource</a>!]</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.notes">notes</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.status">status</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.submissiondate">submissionDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.taxyear">taxYear</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.taxpayer">taxpayer</strong></td>
<td valign="top"><a href="#taxpayer">Taxpayer</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxreporttype.userid">userId</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### Taxpayer

taxpayer

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.city">city</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.email">email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.firstname">firstName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.fulladdress">fullAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.lastname">lastName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.phonenumber">phoneNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.postalcode">postalCode</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.streetaddress">streetAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="taxpayer.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Token

Token

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="token.expiresin">expiresIn</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="token.token">token</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### User

user

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="user.createdat">createdAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.email">email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.firstname">firstName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.isactive">isActive</strong></td>
<td valign="top"><a href="#boolean">Boolean</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.lastname">lastName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.phone">phone</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.profilepic">profilePic</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="user.updatedat">updatedAt</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### Vehicle

vehicle

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.datecreated">dateCreated</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.datemodified">dateModified</strong></td>
<td valign="top"><a href="#datetime">DateTime</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.purchaseprice">purchasePrice</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.registrationnumber">registrationNumber</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="vehicle.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Inputs

### CreateAssetInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createassetinput.assettype">assetType</strong></td>
<td valign="top"><a href="#assettypeenum">AssetTypeEnum</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createassetinput.realestate">realEstate</strong></td>
<td valign="top"><a href="#createrealestateinput">CreateRealEstateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createassetinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createassetinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createassetinput.vehicle">vehicle</strong></td>
<td valign="top"><a href="#createvehicleinput">CreateVehicleInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### CreateBenefitInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.benefittype">benefitType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.providername">providerName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createbenefitinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### CreateDebtInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.debttype">debtType</strong></td>
<td valign="top"><a href="#debttype">DebtType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.housingloan">housingLoan</strong></td>
<td valign="top"><a href="#createhousingloaninput">CreateHousingLoanInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.otherdebt">otherDebt</strong></td>
<td valign="top"><a href="#createotherdebtinput">CreateOtherDebtInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createdebtinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateHousingLoanInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.annualpayments">annualPayments</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.lenderid">lenderId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.lendername">lenderName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.loandate">loanDate</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.loannumber">loanNumber</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.loantermyears">loanTermYears</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.principalrepayment">principalRepayment</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.propertyaddress">propertyAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createhousingloaninput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateIncomeSourceInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.incometype">incomeType</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.sourceidnumber">sourceIdNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.sourcename">sourceName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createincomesourceinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateOtherDebtInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.creditorname">creditorName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.debtidentifier">debtIdentifier</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.debttype">debtType</strong></td>
<td valign="top"><a href="#otherdebttype">OtherDebtType</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createotherdebtinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateRealEstateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.address">address</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.assetid">assetId</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.propertyid">propertyId</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.propertyvalue">propertyValue</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createrealestateinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateTaxReportInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.notes">notes</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.status">status</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.submissiondate">submissionDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totaldeductions">totalDeductions</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totalincome">totalIncome</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totalowed">totalOwed</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totalrefund">totalRefund</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totaltaxableincome">totalTaxableIncome</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxreportinput.totaltaxes">totalTaxes</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### CreateTaxpayerInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.city">city</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.email">email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.firstname">firstName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.fulladdress">fullAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.id">id</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.lastname">lastName</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.phonenumber">phoneNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.postalcode">postalCode</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.streetaddress">streetAddress</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createtaxpayerinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### CreateVehicleInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="createvehicleinput.purchaseprice">purchasePrice</strong></td>
<td valign="top"><a href="#float">Float</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createvehicleinput.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createvehicleinput.registrationnumber">registrationNumber</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createvehicleinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="createvehicleinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### PaginationInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="paginationinput.after">after</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginationinput.before">before</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="paginationinput.limit">limit</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### ResetPasswordInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="resetpasswordinput.password">password</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="resetpasswordinput.token">token</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

### UpdateAssetInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.assettype">assetType</strong></td>
<td valign="top"><a href="#assettypeenum">AssetTypeEnum</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.realestate">realEstate</strong></td>
<td valign="top"><a href="#updaterealestateinput">UpdateRealEstateInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateassetinput.vehicle">vehicle</strong></td>
<td valign="top"><a href="#updatevehicleinput">UpdateVehicleInput</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateBenefitInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.benefittype">benefitType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.providername">providerName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatebenefitinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateDebtInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.debttype">debtType</strong></td>
<td valign="top"><a href="#debttype">DebtType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.housingloan">housingLoan</strong></td>
<td valign="top"><a href="#updatehousingloaninput">UpdateHousingLoanInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.otherdebt">otherDebt</strong></td>
<td valign="top"><a href="#updateotherdebtinput">UpdateOtherDebtInput</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatedebtinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateHousingLoanInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.annualpayments">annualPayments</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.lenderid">lenderId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.lendername">lenderName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.loandate">loanDate</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.loannumber">loanNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.loantermyears">loanTermYears</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.principalrepayment">principalRepayment</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.propertyaddress">propertyAddress</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatehousingloaninput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateIncomeSourceInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.amount">amount</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.incometype">incomeType</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.sourceidnumber">sourceIdNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.sourcename">sourceName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.taxreturnid">taxReturnId</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateincomesourceinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateOtherDebtInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.creditorname">creditorName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.debtidentifier">debtIdentifier</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.debttype">debtType</strong></td>
<td valign="top"><a href="#otherdebttype">OtherDebtType</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.interestexpenses">interestExpenses</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.remainingbalance">remainingBalance</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updateotherdebtinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateRealEstateInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.address">address</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.id">id</strong></td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.propertyid">propertyId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.propertyvalue">propertyValue</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updaterealestateinput.taxpayerid">taxpayerId</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateTaxReportInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.notes">notes</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.status">status</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.submissiondate">submissionDate</strong></td>
<td valign="top"><a href="#datetime">DateTime</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totaldeductions">totalDeductions</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totalincome">totalIncome</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totalowed">totalOwed</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totalrefund">totalRefund</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totaltaxableincome">totalTaxableIncome</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxreportinput.totaltaxes">totalTaxes</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateTaxpayerInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.city">city</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.email">email</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.firstname">firstName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.fulladdress">fullAddress</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.id">id</strong></td>
<td valign="top"><a href="#string">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.lastname">lastName</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.phonenumber">phoneNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.postalcode">postalCode</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.streetaddress">streetAddress</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatetaxpayerinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

### UpdateVehicleInput

<table>
<thead>
<tr>
<th colspan="2" align="left">Field</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong id="updatevehicleinput.id">id</strong></td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatevehicleinput.purchaseprice">purchasePrice</strong></td>
<td valign="top"><a href="#float">Float</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatevehicleinput.purchaseyear">purchaseYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatevehicleinput.registrationnumber">registrationNumber</strong></td>
<td valign="top"><a href="#string">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong id="updatevehicleinput.taxyear">taxYear</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
</tbody>
</table>

## Enums

### AssetTypeEnum

The type of asset

<table>
<thead>
<tr>
<th align="left">Value</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top"><strong>REAL_ESTATE</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>VEHICLE</strong></td>
<td></td>
</tr>
</tbody>
</table>

### DebtType

The type of debt

<table>
<thead>
<tr>
<th align="left">Value</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top"><strong>HOUSING_LOAN</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>OTHER_DEBT</strong></td>
<td></td>
</tr>
</tbody>
</table>

### OtherDebtType

The type of other debt

<table>
<thead>
<tr>
<th align="left">Value</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td valign="top"><strong>CAR_LOAN</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>CREDIT_CARD</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>OTHER</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>PERSONAL_LOAN</strong></td>
<td></td>
</tr>
<tr>
<td valign="top"><strong>STUDENT_LOAN</strong></td>
<td></td>
</tr>
</tbody>
</table>

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### DateTime

A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### Upload

File upload scalar type
