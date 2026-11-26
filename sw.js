/* Labo virtuel EFIR : service worker du mode hors ligne (site découpé : index.html léger + blocs/ + lib/) */
const VERSION = "2026-11-26-3e-ch01-tests-099aab70";
const CACHE_SITE = "efir-site-" + VERSION;   // page d'accueil et manifeste (changent à chaque version)
const CACHE_LOCAL = "efir-local-v2";         // blocs/ et lib/ : noms versionnés, jamais périmés
const CACHE_LIBS = "efir-libs-v1";           // bibliothèques externes restantes (polices, Python)
const PAGES = ["/", "/manifest.webmanifest"];
const LOCAUX = [
"/blocs/sim-1re-ch2-ae1-3d.eb072b7b72.txt",
"/blocs/sim-1re-ch2-ae2-3d.e115120263.txt",
"/blocs/sim-1re-ch2-ae3-3d.0ac847a9da.txt",
"/blocs/sim-1re-ch2-ae4-3d.319bca5214.txt",
"/blocs/d1-cfg-1re-ch2-ae1-3d.a5f5637d83.txt",
"/blocs/d1-cfg-1re-ch2-ae2-3d.3f410110f7.txt",
"/blocs/d1-cfg-1re-ch2-ae3-3d.1e69a6d97e.txt",
"/blocs/d1-cfg-1re-ch2-ae4-3d.458ad95f5c.txt",
"/blocs/exp2d-sc-1re-ch2-ae1-3d.83605be88e.txt",
"/blocs/exp2d-sc-1re-ch2-ae2-3d.3b16200711.txt",
"/blocs/exp2d-sc-1re-ch2-ae3-3d.3b09074775.txt",
"/blocs/exp2d-sc-1re-ch2-ae4-3d.0edf6b0858.txt",
"/blocs/cours-1re-ch02-oxydoreduction.78374c6bbe.txt",
"/blocs/cours-3e-ch01-atomes-ions.acec0d7272.txt",
"/blocs/cours-3e-ch01-tests-ions.099aab70e3.txt",
"/blocs/sim-1re-ch14-ae1-3d.dfb945473b.txt",
"/blocs/sim-1re-ch14-ae3-3d.a630744b7c.txt",
"/blocs/sim-1re-ch14-ae4-3d.c3764df050.txt",
"/blocs/d1-moteur.9d07143b58.txt",
"/blocs/d1-cfg-1re-ch14-ae1-3d.160cb5bda7.txt",
"/blocs/d1-cfg-1re-ch14-ae2-3d.44747d58dc.txt",
"/blocs/d1-cfg-1re-ch14-ae3-3d.335c68ce42.txt",
"/blocs/d1-cfg-1re-ch14-ae4-3d.4a8590d713.txt",
"/blocs/exp2d-sc-1re-ch14-ae1-3d.9c447887b8.txt",
"/blocs/exp2d-sc-1re-ch14-ae4-3d.56e293afee.txt",
"/blocs/cours-1re-ch14-energie.77c89c7939.txt",
"/blocs/a11y-polices-bloc.6b6ff9b4f6.txt",
"/blocs/allege-css.ab90a9a9c9.txt",
"/blocs/allege-moteur.ada2930f82.txt",
"/blocs/autonomie-css.6945d7bef9.txt",
"/blocs/autonomie-moteur.1294a59598.txt",
"/blocs/cours-tle-ch01-acide-base.39bb629688.txt",
"/blocs/cours-tle-ch02-flacon.95fa5e2bd8.txt",
"/blocs/cours-tle-ch03-titrages.8f0314750c.txt",
"/blocs/cours-tle-ch04-cinetique.5ba6fe8a20.txt",
"/blocs/cours-tle-ch05-mecanismes.5af11033d9.txt",
"/blocs/cours-tle-ch06-nucleaire.e92ba35599.txt",
"/blocs/cours-tle-ch07-evolution.9bb741a2e2.txt",
"/blocs/cours-tle-ch08-acides-bases.a51179d6ea.txt",
"/blocs/cours-tle-ch09-electrolyse.461b3aa2e9.txt",
"/blocs/cours-tle-ch10-synthese.7976bcde6a.txt",
"/blocs/cours-tle-ch11-newton.70e170627a.txt",
"/blocs/cours-tle-ch12-carnet.ce8441b902.txt",
"/blocs/cours-tle-ch13-satellite.0f90c48175.txt",
"/blocs/cours-tle-ch14-fluides.cc7e5e3dd8.txt",
"/blocs/cours-tle-ch15-thermo.10281c38c8.txt",
"/blocs/cours-tle-ch16-transferts.957555ba8e.txt",
"/blocs/cours-tle-ch17-doppler.dd3ec1aeb3.txt",
"/blocs/cours-tle-ch18-interferences.924edf8053.txt",
"/blocs/cours-tle-ch19-lunette.b5a124e868.txt",
"/blocs/cours-tle-ch20-photons.e51ad6463a.txt",
"/blocs/cours-tle-ch21-dipole-rc.e2f3591d97.txt",
"/blocs/dd-cfg-tle-ch2-a1-3d.5ad1fc5e22.txt",
"/blocs/dd-cfg-tle-ch2-a2-3d.db5fe3624b.txt",
"/blocs/dd-cfg-tle-ch3-a1-3d.36a942c53f.txt",
"/blocs/dd-cfg-tle-ch3-a2-3d.bbeb553348.txt",
"/blocs/dd-cfg-tle-ch3-a3-3d.88c7dd553f.txt",
"/blocs/dd-cfg-tle-ch3-a4-3d.841af6ac5a.txt",
"/blocs/dd-cfg-tle-ch4-a1-3d.3744877a8e.txt",
"/blocs/dd-cfg-tle-ch4-a2-3d.465aaac16c.txt",
"/blocs/dd-cfg-tle-ch4-a3-3d.8089c6260a.txt",
"/blocs/dd-cfg-tle-ch4-a4-3d.e8ff46804d.txt",
"/blocs/dd-cfg-tle-ch4-a5-3d.dfd52fc12c.txt",
"/blocs/dd-moteur.68764e852a.txt",
"/blocs/eval-devoir.890fe131e2.txt",
"/blocs/exp2d-css.71a08078d6.txt",
"/blocs/exp2d-moteur.693f144e30.txt",
"/blocs/exp2d-sc-1re-ch1-ae1-3d.0341bbc6d5.txt",
"/blocs/exp2d-sc-1re-ch1-ae2-3d.ea3f997389.txt",
"/blocs/exp2d-sc-1re-ch1-ae3-3d.cbb36bf770.txt",
"/blocs/exp2d-sc-1re-ch10-ae2-3d.313564305b.txt",
"/blocs/exp2d-sc-1re-ch11-ae1-3d.08dc7808e9.txt",
"/blocs/exp2d-sc-1re-ch11-ae2-3d.f131908150.txt",
"/blocs/exp2d-sc-1re-ch11-ae3-3d.8beee4faa2.txt",
"/blocs/exp2d-sc-1re-ch12-ae2-3d.eab799ccc4.txt",
"/blocs/exp2d-sc-1re-ch12-ae3-3d.4f93609156.txt",
"/blocs/exp2d-sc-1re-ch13-ae1-3d.914c2d0d9b.txt",
"/blocs/exp2d-sc-1re-ch13-ae2-3d.928e31e746.txt",
"/blocs/exp2d-sc-1re-ch13-ae3-3d.46425130a7.txt",
"/blocs/exp2d-sc-1re-ch14-ae2-3d.2bf813649f.txt",
"/blocs/exp2d-sc-1re-ch14-ae3-3d.5b025dd51d.txt",
"/blocs/exp2d-sc-1re-ch15-ae1-3d.dd45a44d57.txt",
"/blocs/exp2d-sc-1re-ch15-ae2-3d.75b8461b16.txt",
"/blocs/exp2d-sc-1re-ch15-ae3-3d.146ad363dc.txt",
"/blocs/exp2d-sc-1re-ch15-ae4-3d.d529883afb.txt",
"/blocs/exp2d-sc-1re-ch16-ae1-3d.2c860676b8.txt",
"/blocs/exp2d-sc-1re-ch16-ae2-3d.0277a13a53.txt",
"/blocs/exp2d-sc-1re-ch16-ae3-3d.d66da5697f.txt",
"/blocs/exp2d-sc-1re-ch17-ae1-3d.3f8a0940af.txt",
"/blocs/exp2d-sc-1re-ch18-ae2-3d.658fe501df.txt",
"/blocs/exp2d-sc-1re-ch3-ae2-3d.19e9f78936.txt",
"/blocs/exp2d-sc-1re-ch4-ae1-3d.cb9d7d0c55.txt",
"/blocs/exp2d-sc-1re-ch4-ae2-3d.f192cc9679.txt",
"/blocs/exp2d-sc-1re-ch8-ae1-3d.667d102374.txt",
"/blocs/exp2d-sc-1re-ch8-ae2-3d.ef9f65dcab.txt",
"/blocs/exp2d-sc-1re-ch9-ae1-3d.5e85d1cca3.txt",
"/blocs/exp2d-sc-ad1.b79c1f65a3.txt",
"/blocs/exp2d-sc-ad2.c241199e24.txt",
"/blocs/exp2d-sc-ae1.279213ab6f.txt",
"/blocs/exp2d-sc-ae2.5218f8197a.txt",
"/blocs/exp2d-sc-tle-ch10-a1-3d.97c1e8f127.txt",
"/blocs/exp2d-sc-tle-ch10-a2-3d.e815b60d22.txt",
"/blocs/exp2d-sc-tle-ch11-a1-3d.68fc213415.txt",
"/blocs/exp2d-sc-tle-ch11-a2-3d.8c8b67412f.txt",
"/blocs/exp2d-sc-tle-ch12-a1-3d.5875d43e47.txt",
"/blocs/exp2d-sc-tle-ch12-a2-3d.c64c6726b9.txt",
"/blocs/exp2d-sc-tle-ch12-a3-3d.36ed9908fd.txt",
"/blocs/exp2d-sc-tle-ch12-cond-3d.efc610497f.txt",
"/blocs/exp2d-sc-tle-ch13-a1-3d.d827234e7d.txt",
"/blocs/exp2d-sc-tle-ch13-a2-3d.94ade886c3.txt",
"/blocs/exp2d-sc-tle-ch14-a1-3d.d025a3165f.txt",
"/blocs/exp2d-sc-tle-ch14-a2-3d.c477a7fbe0.txt",
"/blocs/exp2d-sc-tle-ch15-a1-3d.26d4070f1f.txt",
"/blocs/exp2d-sc-tle-ch15-a2-3d.f3424698c2.txt",
"/blocs/exp2d-sc-tle-ch16-a1-3d.ec924e556e.txt",
"/blocs/exp2d-sc-tle-ch16-a2-3d.4a4567786f.txt",
"/blocs/exp2d-sc-tle-ch16-a3-3d.3afb7ab9ac.txt",
"/blocs/exp2d-sc-tle-ch17-a1-3d.df3a96f96c.txt",
"/blocs/exp2d-sc-tle-ch17-a2-3d.c1a6f90da2.txt",
"/blocs/exp2d-sc-tle-ch18-a1-3d.eb55e44a99.txt",
"/blocs/exp2d-sc-tle-ch18-a2-3d.c75af19d49.txt",
"/blocs/exp2d-sc-tle-ch18-a3-3d.3458f369ae.txt",
"/blocs/exp2d-sc-tle-ch19-a1-3d.d05a02ae7f.txt",
"/blocs/exp2d-sc-tle-ch2-a1-3d.8291ee5fd3.txt",
"/blocs/exp2d-sc-tle-ch20-a1-3d.7b92c263c0.txt",
"/blocs/exp2d-sc-tle-ch20-a2-3d.8bb1e00918.txt",
"/blocs/exp2d-sc-tle-ch21-a1-3d.c1380d54f2.txt",
"/blocs/exp2d-sc-tle-ch21-a2-3d.da400b97d5.txt",
"/blocs/exp2d-sc-tle-ch21-a3-3d.cecf15299d.txt",
"/blocs/exp2d-sc-tle-ch3-a1-3d.d5f21de6e5.txt",
"/blocs/exp2d-sc-tle-ch3-a2-3d.230a3b827b.txt",
"/blocs/exp2d-sc-tle-ch3-a3-3d.f7fd40a147.txt",
"/blocs/exp2d-sc-tle-ch3-a4-3d.a5af04ea01.txt",
"/blocs/exp2d-sc-tle-ch4-a1-3d.81beb11185.txt",
"/blocs/exp2d-sc-tle-ch4-a2-3d.a7d1dcc4bb.txt",
"/blocs/exp2d-sc-tle-ch4-a4-3d.1c6efa615c.txt",
"/blocs/exp2d-sc-tle-ch4-a5-3d.d567801b58.txt",
"/blocs/exp2d-sc-tle-ch5-a1-3d.f871b6f511.txt",
"/blocs/exp2d-sc-tle-ch6-a2-3d.ad7c331be5.txt",
"/blocs/exp2d-sc-tle-ch7-a1-3d.6c79f63bee.txt",
"/blocs/exp2d-sc-tle-ch7-a2-3d.dd011c86de.txt",
"/blocs/exp2d-sc-tle-ch7-a3-3d.5910b34411.txt",
"/blocs/exp2d-sc-tle-ch9-a1-3d.c7edaebc8d.txt",
"/blocs/exp2d-sc-tp3.7f8f97b6a1.txt",
"/blocs/exp2d-sc-tp4.81edc0eae9.txt",
"/blocs/inc-pap.4a389a41e2.txt",
"/blocs/outil-calculatrice.4d01b9336d.txt",
"/blocs/outil-fiche-calculatrice.d8445ca2bb.txt",
"/blocs/outil-fiche-pointage.699475679e.txt",
"/blocs/outil-fiche-python.d6a0311d02.txt",
"/blocs/outil-fiche-spectro.ba8b6b1a3a.txt",
"/blocs/outil-pointage.f38b8fd88b.txt",
"/blocs/outil-python.6ef4875fbe.txt",
"/blocs/outil-spectro.a05b92717b.txt",
"/blocs/pap-css.c90396dc56.txt",
"/blocs/pap-moteur.f7d645fc46.txt",
"/blocs/parcours-css.e4f87c16d3.txt",
"/blocs/parcours-moteur.9c0e8b90e7.txt",
"/blocs/quiz-moteur.836f32e2a8.txt",
"/blocs/sim-1re-ch1-ae1-3d.e15f2a8f56.txt",
"/blocs/sim-1re-ch1-ae2-3d.fc7ef302b0.txt",
"/blocs/sim-1re-ch1-ae3-3d.cf6df18377.txt",
"/blocs/sim-1re-ch10-ae1-3d.181f806b77.txt",
"/blocs/sim-1re-ch10-ae2-3d.f09388dd2d.txt",
"/blocs/sim-1re-ch11-ae1-3d.7efde2a34a.txt",
"/blocs/sim-1re-ch11-ae2-3d.098835f724.txt",
"/blocs/sim-1re-ch11-ae3-3d.e13f8cbc02.txt",
"/blocs/sim-1re-ch12-ae2-3d.09298994ee.txt",
"/blocs/sim-1re-ch12-ae3-3d.532e8a0786.txt",
"/blocs/sim-1re-ch13-ae1-3d.a2486c9545.txt",
"/blocs/sim-1re-ch13-ae2-3d.86ff33208e.txt",
"/blocs/sim-1re-ch13-ae3-3d.8cf5a780cb.txt",
"/blocs/sim-1re-ch14-ae2-3d.8465e952a7.txt",
"/blocs/sim-1re-ch15-ae1-3d.9c98608327.txt",
"/blocs/sim-1re-ch15-ae2-3d.79b2e18f7e.txt",
"/blocs/sim-1re-ch15-ae3-3d.b89ec77df6.txt",
"/blocs/sim-1re-ch15-ae4-3d.36febc92fa.txt",
"/blocs/sim-1re-ch16-ae1-3d.b25c376918.txt",
"/blocs/sim-1re-ch16-ae2-3d.851fdbe9a0.txt",
"/blocs/sim-1re-ch16-ae3-3d.f31ce7c518.txt",
"/blocs/sim-1re-ch17-ae1-3d.bf6cd84abe.txt",
"/blocs/sim-1re-ch17-ae2-3d.b4bb007d68.txt",
"/blocs/sim-1re-ch18-ae2-3d.a89ea10d86.txt",
"/blocs/sim-1re-ch3-ae2-3d.a00af201fc.txt",
"/blocs/sim-1re-ch4-ae1-3d.af19b67559.txt",
"/blocs/sim-1re-ch4-ae2-3d.3fa00e6747.txt",
"/blocs/sim-1re-ch6-ae3-3d.9af90849da.txt",
"/blocs/sim-1re-ch8-ae1-3d.3b48b843ca.txt",
"/blocs/sim-1re-ch8-ae2-3d.d8b5f8e48e.txt",
"/blocs/sim-1re-ch9-ae1-3d.5000b7a5e8.txt",
"/blocs/sim-1re-qcm-ch1.56fc77527a.txt",
"/blocs/sim-1re-qcm-ch10.41089e2afb.txt",
"/blocs/sim-1re-qcm-ch11.404a0996d0.txt",
"/blocs/sim-1re-qcm-ch12.2d003c042d.txt",
"/blocs/sim-1re-qcm-ch13.4cd73029d0.txt",
"/blocs/sim-1re-qcm-ch14.840d1e7a24.txt",
"/blocs/sim-1re-qcm-ch15.5d8a61ee8f.txt",
"/blocs/sim-1re-qcm-ch16.54dd9a4deb.txt",
"/blocs/sim-1re-qcm-ch17.72794cc217.txt",
"/blocs/sim-1re-qcm-ch18.82bf5d86fe.txt",
"/blocs/sim-1re-qcm-ch2.224753ba3b.txt",
"/blocs/sim-1re-qcm-ch3.e87d63fb97.txt",
"/blocs/sim-1re-qcm-ch4.1256f3d7a2.txt",
"/blocs/sim-1re-qcm-ch5.a12fc0f036.txt",
"/blocs/sim-1re-qcm-ch6.4e0d47bfb0.txt",
"/blocs/sim-1re-qcm-ch7.705d2a8d42.txt",
"/blocs/sim-1re-qcm-ch8.7346aac7ca.txt",
"/blocs/sim-1re-qcm-ch9.0ed83a760a.txt",
"/blocs/sim-3e-qcm-ch0.70035c96fb.txt",
"/blocs/sim-3e-qcm-ch2.c4ffb9724f.txt",
"/blocs/sim-3e-qcm-ch3.f2ee1712d6.txt",
"/blocs/sim-3e-qcm-ch4.b136257294.txt",
"/blocs/sim-3e-qcm-ch5.3601b4f7af.txt",
"/blocs/sim-3e-qcm-ch6.55590d20d1.txt",
"/blocs/sim-3e-qcm-ch7.cafbf7a0ef.txt",
"/blocs/sim-3e-sig-ae1-cloche.32dcfcf76c.txt",
"/blocs/sim-3e-sig-ae2-vitesse.22f2ff98c4.txt",
"/blocs/sim-3e-sig-ae3-frequence.6919bde602.txt",
"/blocs/sim-3e-sig-ae4-lumiere.300717607c.txt",
"/blocs/sim-3e-sig-ae5-sonar.89a9f02ed3.txt",
"/blocs/sim-3e-sig-ae6-fibre.35b30a7a2f.txt",
"/blocs/sim-ad1.6abdef8e1a.txt",
"/blocs/sim-ad2.a1c27f3a94.txt",
"/blocs/sim-ae1.bee2cff172.txt",
"/blocs/sim-ae2.21d983c094.txt",
"/blocs/sim-clair.6e38402aaa.txt",
"/blocs/sim-tle-ch10-a1-3d.e0fc8d176a.txt",
"/blocs/sim-tle-ch10-a2-3d.61cdc93c0c.txt",
"/blocs/sim-tle-ch10-a3-3d.eaef13c22a.txt",
"/blocs/sim-tle-ch11-a1-3d.9846941e62.txt",
"/blocs/sim-tle-ch11-a2-3d.8df0d26bd6.txt",
"/blocs/sim-tle-ch12-a1-3d.50e2eee7db.txt",
"/blocs/sim-tle-ch12-a2-3d.a7c6a847ff.txt",
"/blocs/sim-tle-ch12-a3-3d.ab00925df4.txt",
"/blocs/sim-tle-ch12-cond-3d.7014f169c1.txt",
"/blocs/sim-tle-ch12-ex31.65b630b2ad.txt",
"/blocs/sim-tle-ch13-a1-3d.9e7ac660ea.txt",
"/blocs/sim-tle-ch13-a2-3d.0873f1af68.txt",
"/blocs/sim-tle-ch14-a1-3d.a72ae774be.txt",
"/blocs/sim-tle-ch14-a2-3d.850fe1acd5.txt",
"/blocs/sim-tle-ch15-a1-3d.8c8e7548b9.txt",
"/blocs/sim-tle-ch15-a2-3d.2ee99cc3d7.txt",
"/blocs/sim-tle-ch16-a1-3d.b313902f2a.txt",
"/blocs/sim-tle-ch16-a2-3d.31527a2d4c.txt",
"/blocs/sim-tle-ch16-a3-3d.0c948e08bb.txt",
"/blocs/sim-tle-ch17-a1-3d.30d1ebc08f.txt",
"/blocs/sim-tle-ch17-a2-3d.c2302dad69.txt",
"/blocs/sim-tle-ch18-a1-3d.9f5270cda2.txt",
"/blocs/sim-tle-ch18-a2-3d.ad9d69e2fb.txt",
"/blocs/sim-tle-ch18-a3-3d.32ffec8078.txt",
"/blocs/sim-tle-ch19-a1-3d.9224cf03d1.txt",
"/blocs/sim-tle-ch2-a1-3d.eebdfe47a4.txt",
"/blocs/sim-tle-ch2-a2-3d.7729c0c3f7.txt",
"/blocs/sim-tle-ch2-sondes.3713a74de6.txt",
"/blocs/sim-tle-ch2-spectro.a80bfb7af0.txt",
"/blocs/sim-tle-ch2-tp1-bouillie.769fe7a22d.txt",
"/blocs/sim-tle-ch2-tp2-serum.a87360292c.txt",
"/blocs/sim-tle-ch20-a1-3d.803bab899e.txt",
"/blocs/sim-tle-ch20-a2-3d.5456b7ef29.txt",
"/blocs/sim-tle-ch21-a1-3d.8ff9b1ab22.txt",
"/blocs/sim-tle-ch21-a2-3d.12c4daeb0b.txt",
"/blocs/sim-tle-ch21-a3-3d.4757394108.txt",
"/blocs/sim-tle-ch3-a1-3d.85a553e71d.txt",
"/blocs/sim-tle-ch3-a2-3d.08223003ab.txt",
"/blocs/sim-tle-ch3-a3-3d.7826712953.txt",
"/blocs/sim-tle-ch3-a4-3d.3fe38de660.txt",
"/blocs/sim-tle-ch3-sondes.ebd5665a8d.txt",
"/blocs/sim-tle-ch3-titrage-cond.f110e866c6.txt",
"/blocs/sim-tle-ch3-titrage-ph.397704e2fe.txt",
"/blocs/sim-tle-ch4-a1-3d.7db783a92c.txt",
"/blocs/sim-tle-ch4-a2-3d.46783b34e8.txt",
"/blocs/sim-tle-ch4-a3-3d.0f0d8a1eae.txt",
"/blocs/sim-tle-ch4-a4-3d.97b9fd2764.txt",
"/blocs/sim-tle-ch4-a5-3d.6c2abc8cbb.txt",
"/blocs/sim-tle-ch5-a1-3d.60fcf15acd.txt",
"/blocs/sim-tle-ch5-a2-3d.3eded8e52e.txt",
"/blocs/sim-tle-ch5-a3-3d.9ff436f3b4.txt",
"/blocs/sim-tle-ch6-a1-3d.3f327a6cf1.txt",
"/blocs/sim-tle-ch6-a2-3d.cb1e9e8e18.txt",
"/blocs/sim-tle-ch7-a1-3d.f86452f006.txt",
"/blocs/sim-tle-ch7-a2-3d.87686c6e57.txt",
"/blocs/sim-tle-ch7-a3-3d.2406e23787.txt",
"/blocs/sim-tle-ch9-a1-3d.fa63513a79.txt",
"/blocs/sim-tle-ch9-a2-3d.6a1fb8cfa8.txt",
"/blocs/sim-tle-mesures-incertitudes.9bccdeb50f.txt",
"/blocs/sim-tle-qcm-ch1.ff4f0dbc0f.txt",
"/blocs/sim-tle-qcm-ch10.09fbdfbcaa.txt",
"/blocs/sim-tle-qcm-ch11.108607e4f2.txt",
"/blocs/sim-tle-qcm-ch12.41f87d79e3.txt",
"/blocs/sim-tle-qcm-ch13.42ed95e6ac.txt",
"/blocs/sim-tle-qcm-ch14.be24527681.txt",
"/blocs/sim-tle-qcm-ch15.73b38d9c7f.txt",
"/blocs/sim-tle-qcm-ch16.259d029e32.txt",
"/blocs/sim-tle-qcm-ch17.1d320aac6c.txt",
"/blocs/sim-tle-qcm-ch18.5b76bce7ae.txt",
"/blocs/sim-tle-qcm-ch19.b1f467839a.txt",
"/blocs/sim-tle-qcm-ch2.57798d69c7.txt",
"/blocs/sim-tle-qcm-ch20.1aaaa9400d.txt",
"/blocs/sim-tle-qcm-ch21.71ec0497c8.txt",
"/blocs/sim-tle-qcm-ch3.bc227f064d.txt",
"/blocs/sim-tle-qcm-ch4.241c5792f0.txt",
"/blocs/sim-tle-qcm-ch5.ccd7270a75.txt",
"/blocs/sim-tle-qcm-ch6.debd78f5ed.txt",
"/blocs/sim-tle-qcm-ch7.435a0853d2.txt",
"/blocs/sim-tle-qcm-ch8.4ed1ced1c2.txt",
"/blocs/sim-tle-qcm-ch9.abf5adca11.txt",
"/blocs/sim-tp3.073c88b957.txt",
"/blocs/sim-tp4.ef79e4bb38.txt",
"/blocs/sim1re-commun.5e836a13a3.txt",
"/lib/codemirror-5.65.16/closebrackets.js",
"/lib/codemirror-5.65.16/codemirror.css",
"/lib/codemirror-5.65.16/codemirror.js",
"/lib/codemirror-5.65.16/matchbrackets.js",
"/lib/codemirror-5.65.16/python.js",
"/lib/jspdf-2.5.1.umd.min.js",
"/lib/math-11.11.0.js",
"/lib/three-r128.min.js"
];                   // tous les fichiers blocs/ et lib/ de cette version
const ESSENTIELS = [
"/blocs/allege-css.ab90a9a9c9.txt",
"/blocs/allege-moteur.ada2930f82.txt",
"/blocs/autonomie-css.6945d7bef9.txt",
"/blocs/autonomie-moteur.1294a59598.txt",
"/blocs/dd-moteur.68764e852a.txt",
"/blocs/eval-devoir.890fe131e2.txt",
"/blocs/exp2d-css.71a08078d6.txt",
"/blocs/exp2d-moteur.693f144e30.txt",
"/blocs/inc-pap.4a389a41e2.txt",
"/blocs/pap-css.c90396dc56.txt",
"/blocs/pap-moteur.f7d645fc46.txt",
"/blocs/parcours-css.e4f87c16d3.txt",
"/blocs/parcours-moteur.9c0e8b90e7.txt",
"/blocs/quiz-moteur.836f32e2a8.txt",
"/blocs/sim-clair.6e38402aaa.txt",
"/lib/three-r128.min.js"
];           // gardés dès la première visite (petits, utiles partout)
const POLICES_CSS = [
 "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:wght@600;700&display=swap",
 "https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:wght@600;700&family=JetBrains+Mono:wght@400;600&display=swap",
 "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
 "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
];
const PYTHON_PAQUETS = ["numpy", "matplotlib"];
const ENSEMBLE_LOCAUX = new Set(LOCAUX);

async function metEnCache(cache, url, mode) {
  try {
    if (await cache.match(url)) return false;
    const r = await fetch(mode ? new Request(url, { mode: "cors", credentials: "omit" }) : url);
    if (r.ok) { await cache.put(url, r); return true; }
  } catch (e) { /* un fichier manquant ne bloque pas l'installation */ }
  return false;
}
async function polices(cache) {
  for (const u of POLICES_CSS) {
    try {
      if (await cache.match(u)) continue;
      const r = await fetch(new Request(u, { mode: "cors", credentials: "omit" }));
      if (!r.ok) continue;
      const css = await r.clone().text(); await cache.put(u, r);
      const fichiers = [...css.matchAll(/url\((https:[^)'"]+)\)/g)].map(m => m[1]);
      await Promise.all(fichiers.map(f => metEnCache(cache, f, true)));
    } catch (e) {}
  }
}

self.addEventListener("install", ev => {
  ev.waitUntil((async () => {
    const site = await caches.open(CACHE_SITE);
    await Promise.all(PAGES.map(p => fetch(p, { cache: "reload" }).then(r => r.ok && site.put(p, r)).catch(() => {})));
    const loc = await caches.open(CACHE_LOCAL);
    await Promise.all(ESSENTIELS.map(u => metEnCache(loc, u)));
    await polices(await caches.open(CACHE_LIBS));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", ev => {
  ev.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("efir-site-") && k !== CACHE_SITE) await caches.delete(k);
    /* fichiers d'anciennes versions : retirés pour libérer la place */
    const loc = await caches.open(CACHE_LOCAL);
    for (const req of await loc.keys()) if (!ENSEMBLE_LOCAUX.has(new URL(req.url).pathname)) await loc.delete(req);
    /* anciennes copies des bibliothèques prises sur cdnjs/jsdelivr, désormais sur le site */
    const libs = await caches.open(CACHE_LIBS);
    for (const req of await libs.keys()) if (/cdnjs\.cloudflare\.com\/ajax\/libs\/(three\.js|jspdf|mathjs|codemirror)\//.test(req.url)) await libs.delete(req);
    await self.clients.claim();
  })());
});

/* Application installée : tout garder en arrière-plan (demandé par la page) */
let toutEnCours = false;
async function toutGarder() {
  if (toutEnCours) return; toutEnCours = true;
  let nouveaux = 0;
  try {
    const loc = await caches.open(CACHE_LOCAL);
    for (const u of LOCAUX) if (await metEnCache(loc, u)) nouveaux++;
    const fin = await caches.open(CACHE_LOCAL), ok = (await Promise.all(LOCAUX.map(u => fin.match(u)))).every(Boolean);
    if (ok) for (const c of await self.clients.matchAll()) c.postMessage({ type: "efir-garde-fini", version: VERSION, nouveaux });
  } finally { toutEnCours = false; }
}
self.addEventListener("message", ev => {
  if (ev.data && ev.data.type === "efir-tout-garder") ev.waitUntil(toutGarder());
});

/* Python (Pyodide) : après un premier chargement en ligne, on garde aussi numpy et matplotlib pour le hors ligne */
let pythonPrepare = false;
async function prepPython(base, lock) {
  if (pythonPrepare) return; pythonPrepare = true;
  try {
    const pk = lock.packages || {}, vus = new Set(), pile = [...PYTHON_PAQUETS];
    while (pile.length) { const n = pile.pop(); if (vus.has(n) || !pk[n]) continue; vus.add(n); pile.push(...(pk[n].depends || [])); }
    const libs = await caches.open(CACHE_LIBS);
    for (const n of vus) await metEnCache(libs, base + pk[n].file_name, true);
  } catch (e) { pythonPrepare = false; }
}

async function depuisReseauOuCache(req, ev) {
  const libs = await caches.open(CACHE_LIBS);
  const garde = await libs.match(req.url);
  if (garde) return garde;
  const r = await fetch(req);
  if (r.ok || r.type === "opaque") {
    ev.waitUntil(libs.put(req.url, r.clone()).catch(() => {}));
    const m = req.url.match(/^(https:\/\/cdn\.jsdelivr\.net\/pyodide\/v[^/]+\/full\/)pyodide-lock\.json$/);
    if (m && r.ok) ev.waitUntil(r.clone().json().then(l => prepPython(m[1], l)).catch(() => {}));
  }
  return r;
}

async function local(req, chemin, ev) {        // blocs/ et lib/ : d'abord l'appareil, sinon Internet (puis gardé)
  const loc = await caches.open(CACHE_LOCAL);
  const g = await loc.match(chemin);
  if (g) return g;
  const r = await fetch(req);
  if (r.ok) ev.waitUntil(loc.put(chemin, r.clone()).catch(() => {}));
  return r;
}

async function page(req, ev) {
  const site = await caches.open(CACHE_SITE);
  const cle = new URL(req.url).pathname.replace(/index\.html$/, "");
  const reseau = fetch(req).then(r => { if (r.ok) ev.waitUntil(site.put(cle, r.clone())); return r; });
  const delai = new Promise(ok => setTimeout(ok, 4000));
  try {
    const r = await Promise.race([reseau, delai.then(() => null)]);
    if (r) return r;
    const g = await site.match(cle); if (g) return g;
    return await reseau;
  } catch (e) {
    const g = (await site.match(cle)) || (await site.match("/"));
    if (g) return g; throw e;
  }
}

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;               // les envois au professeur (POST) passent directement
  const u = new URL(req.url);
  if (u.origin === self.location.origin) {
    if (req.mode === "navigate") { ev.respondWith(page(req, ev)); return; }
    if (ENSEMBLE_LOCAUX.has(u.pathname)) { ev.respondWith(local(req, u.pathname, ev)); return; }
    if (PAGES.includes(u.pathname)) ev.respondWith(caches.open(CACHE_SITE).then(c => c.match(u.pathname)).then(g => g || fetch(req)));
    return;
  }
  if (/^(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com|esm\.sh|raw\.githack\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(u.hostname))
    ev.respondWith(depuisReseauOuCache(req, ev));
});
