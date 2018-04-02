{
    'targets': [
        {
          'target_name': 'uchardet',
          'type': 'executable',
          'defines': [
            'PACKAGE_NAME="uchardet"',
            'PACKAGE_URL="https://www.freedesktop.org/wiki/Software/uchardet/"',
            'PACKAGE_BUGREPORT="https://bugs.freedesktop.org/enter_bug.cgi?product=uchardet"',
            'UCHARDET_VERSION_MAJOR=0',
            'UCHARDET_VERSION_MINOR=0',
            'UCHARDET_VERSION_REVISION=6',
            'UCHARDET_VERSION="0.0.6"',
            'UCHARDET_LIBRARY="libuchardet"',
            'VERSION="0.0.6"',
          ],
          'include_dirs': [
            'uchardet/src',
          ],
          'direct_dependent_settings': {
            'include_dirs': [
                'uchardet/src',
            ],
          },
          'sources': [
            'uchardet/src/LangModels/LangArabicModel.cpp',
            'uchardet/src/LangModels/LangBulgarianModel.cpp',
            'uchardet/src/LangModels/LangRussianModel.cpp',
            'uchardet/src/LangModels/LangEsperantoModel.cpp',
            'uchardet/src/LangModels/LangFrenchModel.cpp',
            'uchardet/src/LangModels/LangDanishModel.cpp',
            'uchardet/src/LangModels/LangGermanModel.cpp',
            'uchardet/src/LangModels/LangGreekModel.cpp',
            'uchardet/src/LangModels/LangHungarianModel.cpp',
            'uchardet/src/LangModels/LangHebrewModel.cpp',
            'uchardet/src/LangModels/LangSpanishModel.cpp',
            'uchardet/src/LangModels/LangThaiModel.cpp',
            'uchardet/src/LangModels/LangTurkishModel.cpp',
            'uchardet/src/LangModels/LangVietnameseModel.cpp',
            'uchardet/src/CharDistribution.cpp',
            'uchardet/src/JpCntx.cpp',
            'uchardet/src/nsHebrewProber.cpp',
            'uchardet/src/nsCharSetProber.cpp',
            'uchardet/src/nsBig5Prober.cpp',
            'uchardet/src/nsEUCJPProber.cpp',
            'uchardet/src/nsEUCKRProber.cpp',
            'uchardet/src/nsEUCTWProber.cpp',
            'uchardet/src/nsEscCharsetProber.cpp',
            'uchardet/src/nsEscSM.cpp',
            'uchardet/src/nsGB2312Prober.cpp',
            'uchardet/src/nsSBCSGroupProber.cpp',
            'uchardet/src/nsMBCSGroupProber.cpp',
            'uchardet/src/nsMBCSSM.cpp',
            'uchardet/src/nsSBCharSetProber.cpp',
            'uchardet/src/nsSJISProber.cpp',
            'uchardet/src/nsUTF8Prober.cpp',
            'uchardet/src/nsLatin1Prober.cpp',
            'uchardet/src/nsUniversalDetector.cpp',
            'uchardet/src/tools/uchardet.cpp',
            'uchardet/src/uchardet.cpp',
          ],
          'ccflags': [
            '-Wall',
            '-Wextra',
            '-Wno-unused-parameter',
            '-fno-exceptions',
            '-fno-rtti',
            '-Wl',
            '-exported_symbols_list',
            '-mmacosx-version-min=10.13',
            '-lstdc++',
          ],
          # Have to repeat flags on mac because of gyp's xcode emulation "feature".
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'NO',
            'GCC_ENABLE_CPP_RTTI': 'NO',
            'WARNING_CFLAGS!': [
                '-W',
                '-Wall',
                '-Wextra'
            ],
            'WARNING_CFLAGS': [
                '-Wall',
                '-Wextra',
                '-Wno-unused-parameter',
                '-Wno-parentheses-equality',
                '-Wno-static-in-inline',
                '-Wno-tautological-compare',
            ],
          },

          'msvs_settings': {
            'VCCLCompilerTool': {
              'DisableSpecificWarnings': [
                '4018',  # Signed/unsigned comparison.
                '4090',  # Const/non-const mismatch.
                '4244',  # Narrowing cast.
                '4267',  # Narrowing cast.
              ],
            },
          },
        }
    ]
}
