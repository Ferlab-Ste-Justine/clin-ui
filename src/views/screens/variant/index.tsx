import React from "react";
import { useParams } from "react-router-dom";

import VariantSearchPage from "views/screens/variant/VariantSearchPage"
import { GraphqlBackend } from "store/providers";
import ApolloProvider from "store/providers/apollo";

const SearchScreen = (): React.ReactElement => {
  const token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3a2xNaVgtUmdTbHk0X0puRG9ULXotNWJEdmMwb2NYSEF5MWE1ZDg1ZnZJIn0.eyJleHAiOjE2MzY1NjA0ODIsImlhdCI6MTYzNjU2MDQyMiwiYXV0aF90aW1lIjoxNjM2NTYwMzQ4LCJqdGkiOiJjOWQ3NGIxMi0yYTY5LTQ3ZTctYmJlYi04N2U5ZjcyNjg0Y2QiLCJpc3MiOiJodHRwczovL2F1dGgucWEuY2xpbi5mZXJsYWIuYmlvL2F1dGgvcmVhbG1zL2NsaW4iLCJhdWQiOiJjbGluLWFjbCIsInN1YiI6ImI4NTExNjY0LTgyOWItNDQ1MS1hNWRlLWY4YzA3MGNlN2FhMyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNsaW4tY2xpZW50Iiwic2Vzc2lvbl9zdGF0ZSI6IjkxZGE4YzVjLWQ1ZGEtNDVmNy04YjJlLWNiM2VkNDI0Y2MxOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9sb2NhbGhvc3Q6MjAwMCIsImh0dHBzOi8vcWEuY2xpbi5mZXJsYWIuYmlvIiwiaHR0cDovL2xvY2FsaG9zdDoyMDAwIiwiaHR0cHM6Ly9hdXRoLnFhLmNsaW4uZmVybGFiLmJpbyJdLCJhdXRob3JpemF0aW9uIjp7InBlcm1pc3Npb25zIjpbeyJzY29wZXMiOlsicmVhZCJdLCJyc2lkIjoiNTNhNzQ3NTItZGI4ZC00Mzc4LWJkYzctZjg3OGUxMmI1ZWNkIiwicnNuYW1lIjoiQ29kZVN5c3RlbSJ9LHsicnNpZCI6IjgyMDE2MThmLWFjYmEtNDc4Ny1hOGNlLTQzNTUzZTI4MjVlNCIsInJzbmFtZSI6InBhdGllbnQtdmFyaWFudHMifSx7InNjb3BlcyI6WyJyZWFkIl0sInJzaWQiOiIyNmFlMWEzOS00NTU1LTRhNTYtYjk3NS02MjU3MTQ3ZjRkMjgiLCJyc25hbWUiOiJWYWx1ZVNldCJ9LHsic2NvcGVzIjpbInJlYWQiXSwicnNpZCI6ImIxYmI2MTFjLTFjYTYtNDkyNC05NzVlLTk1NWVmMzhlNGVmZCIsInJzbmFtZSI6IkJ1bmRsZSJ9LHsicnNpZCI6IjEwODJiNjA5LTVjODMtNDRiOS04ZWMzLWI1MDc1NzdlOTFlMyIsInJzbmFtZSI6IkV4cG9ydCJ9LHsic2NvcGVzIjpbInJlYWQiXSwicnNpZCI6IjcyM2E2ZmE3LWJmMDctNDIwMC1iZmYwLWFmYWFhNDdiMjgyZCIsInJzbmFtZSI6IlNwZWNpbWVuIn0seyJzY29wZXMiOlsicmVhZCJdLCJyc2lkIjoiMTFlZDM5YzMtOGQ1Ny00MTIwLWI3NmYtODcyMWM0MWRjNTc0IiwicnNuYW1lIjoiUHJhY3RpdGlvbmVyUm9sZSJ9LHsic2NvcGVzIjpbInJlYWQiXSwicnNpZCI6ImI4NGE1Yzg0LTU5OTEtNDAzMC05YmU5LTFlMjhjNTAxNmI0NiIsInJzbmFtZSI6IkRvY3VtZW50UmVmZXJlbmNlIn0seyJzY29wZXMiOlsicmVhZCJdLCJyc2lkIjoiYTk3YzY1NDktNTc0Yy00MThjLTg2NDMtNTIyNWJkNDI1ODM5IiwicnNuYW1lIjoiVGFzayJ9LHsicnNpZCI6IjkwODRkZDFlLTFjODEtNGU4OC04YzYwLTMwODA3NDUyMzllYSIsInJzbmFtZSI6InBhdGllbnQtZmlsZXMifSx7InJzaWQiOiJiMDk0ODQ2OS0wZDllLTQ3OGYtYTEzNS04YzBiYzI2NTE3NjEiLCJyc25hbWUiOiJwYXRpZW50LWxpc3QifSx7InNjb3BlcyI6WyJyZWFkIl0sInJzaWQiOiJhOWU5NTkxMi00NDUwLTQxNDYtYmJiZS0wOGE3YjhjYmRiNGEiLCJyc25hbWUiOiJTZWFyY2hQYXJhbWV0ZXIifSx7InJzaWQiOiJlYmMwOWRlZC1kZTI5LTQ0ZmUtOTZlNy05Y2VhNzQyYWQxYTciLCJyc25hbWUiOiJwYXRpZW50LWZhbWlseSJ9LHsicnNpZCI6IjNhYjg5MTAzLWZjOWMtNGYwNy04ZGQ5LTQ4MzFkOTI4ZjU5OSIsInJzbmFtZSI6ImRvd25sb2FkIn0seyJzY29wZXMiOlsicmVhZCJdLCJyc2lkIjoiNTZjYTdkNWUtNDUzYS00NDc5LTljMDctYTI2Mzg1NjRjNzFmIiwicnNuYW1lIjoiT3JnYW5pemF0aW9uIn0seyJzY29wZXMiOlsicmVhZCJdLCJyc2lkIjoiZjU5OTlhMTQtZDFkZi00MzI0LWJiMmQtNDg5OTZlMjY3MGUzIiwicnNuYW1lIjoiU3RydWN0dXJlRGVmaW5pdGlvbiJ9LHsicnNpZCI6IjUxOGUwNjY1LWMyMWUtNGE4OS04MWEzLWMzZDVlMjQwNDZmYSIsInJzbmFtZSI6InBhdGllbnQtcHJlc2NyaXB0aW9ucyJ9LHsic2NvcGVzIjpbInJlYWQiXSwicnNpZCI6ImNkY2IwNGFlLTRkYmEtNDFkYi05MGIzLTA5MTdmZjViNTg4NSIsInJzbmFtZSI6IlByYWN0aXRpb25lciJ9XX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQmlvaW5mb3JtYXRpY2lhbiBCaW9pbmZvcm1hdGljaWFuIiwiZmhpcl9wcmFjdGl0aW9uZXJfaWQiOiI4NmI3NjRhZS04ZDVhLTRlMTEtOWI4ZS1lNzU2YTUxYTkwYjQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJiaW9pbmZvcm1hdGljaWFuIiwibG9jYWxlIjoiZnIiLCJnaXZlbl9uYW1lIjoiQmlvaW5mb3JtYXRpY2lhbiIsImZhbWlseV9uYW1lIjoiQmlvaW5mb3JtYXRpY2lhbiIsImVtYWlsIjoiYmlvaW5mb3JtYXRpY2llbkBmZXJsYWIuYmlvIn0.Tk1Y13Knhrmjnpqm_B00rEP1brRlSHgqxqo3bdk29IDd5IehC8XgbUgJKCl4j_iwqu-zbpPm1qzMmqxFrEQR930jQJESLiIyDTS979FQVGmkh4QcnXP1zj510Dzy0BVBleAm6neTQy-NLk7PtHSQrLhzdWmWn1OSOTeN81xe8sm5pl_3g2DBFBrd9z1Qn-fiDTiysrqlO0IG4D4gPI3QVAMo98z1Z8Cm1blqRX89Zz0-CXb1BEf7paF6o84JO-G9hVMlOgGgmqDpWmcuNFG_up2nLG6AGLM2R6EhPNQCDc0V4i4idiWorz-L5_cNu_UL02QGO3jE12SPP2KEua-seg"

  return (
    <ApolloProvider backend={GraphqlBackend.ARRANGER} token={token}>
      <VariantSearchPage />
    </ApolloProvider>
  );
};
export default SearchScreen;
