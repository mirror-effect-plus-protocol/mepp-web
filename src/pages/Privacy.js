/*
 * MEPP - A web application to guide patients and clinicians in the process of
 * facial palsy rehabilitation, with the help of the mirror effect and principles
 * of motor learning
 * Copyright (C) 2021 MEPP <info@mirroreffectplus.org>
 *
 * This file is part of MEPP.
 *
 * MEPP is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MEPP is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MEPP.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { media } from '@styles/configs/breakpoints';
import { spacings } from '@styles/configs/spacings';
import { FlexAlignMiddle, Wrapper } from '@styles/tools';

import { useLocale } from '@hooks/locale/useLocale';
import { useTrackingView } from '@hooks/useTrackingView';

import { Language } from '@utils/constants';

import BasicLayout from '@layouts/Basic';

import { Footer } from '@components/footer/Footer';
import { H3, H5, P, H6, BR, Href } from '@components/generics/basics/index';
import { Header } from '@components/header/Header';

/**
 * Privacy policy page with BasicLayout
 */
const PrivacyPage = () => {
  const {locale} = useLocale();
  const {t} = useTranslation();
  useTrackingView('/privacy');

  return (
    <BasicLayout
      header={<Header/>}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {locale === Language.FR ? <PrivacyFr t={t}/> : <PrivacyEn t={t}/>}
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer/>}
    />
  );
};

const PrivacyFr = ({t}) => {
  return (
    <>
      <H3>POLITIQUE DE PROTECTION DES RENSEIGNEMENTS PERSONNELS</H3>
      <P>Dernière mise à jour : Décembre 2021</P>
      <P>
        L’équipe du MEPP, l’Université de Montréal, le CIUSSS du
        Nord-de-l’île-de-Montréal ainsi que de l’Est-de-l’île-de-Montréal ( ou <b>«&nbsp;nous&nbsp;»</b>)
        accordent une grande importance à la protection de vos
        renseignements personnels ainsi que votre vie privée et tient à ce que
        votre expérience avec elle et avec la plateforme MEPP (le <b>«&nbsp;Service&nbsp;»</b>)
        soit la plus satisfaisante et la plus sécuritaire possible. Vous
        comprenez qu’en utilisant le Service, le Service vous sera distribué par
        MEPP et que les renseignements personnels que vous pourriez nous fournir
        pourront être utilisés pour les fins indiquées aux présentes. Aux fins
        de la présente politique de protection des renseignements personnels (la
        <b>«&nbsp;Politique&nbsp;»</b>), l’expression <b>«&nbsp;Renseignements personnels&nbsp;»</b> signifie
        toute information se rapportant à une personne physique identifiée ou
        identifiable. Une personne identifiable est une personne qui peut être
        identifiée, directement ou indirectement, par référence à un ou
        plusieurs éléments spécifiques, propres à son identité physique,
        physiologique, génétique, psychique, économique, culturelle ou sociale.
      </P>
      <P>
        Cette Politique vous informe i) des types de Renseignements personnels
        que nous traitons par le biais du Service, ii) des finalités des
        traitements qu’elle en fait et les bases juridiques de tels traitements
        et iii) de la durée de conservation de vos Renseignements personnels.
        Cette Politique vous informe également des catégories de personnes à qui
        nous pouvons transmettre vos Renseignements personnels et dans quelles
        circonstances nous pouvons le faire. De plus, vous y retrouverez les
        droits relatifs à vos Renseignements personnels que vous pouvez exercer
        à notre endroit. Nous traiterons vos Renseignements personnels que sur
        la base contractuelle de la présente Politique.
      </P>
      <P>
        Nous ajustons en permanence nos pratiques en matière de respect de
        Renseignements personnels afin qu’elles soient en tout temps conformes
        aux principes de la Loi sur la protection des renseignements personnels
        et les documents électroniques (Canada), de la Loi sur la protection des
        renseignements personnels dans le secteur privé (Québec) et de toute
        autre loi similaire applicable.
      </P>

      <H5>1. CATÉGORIE DE RENSEIGNEMENTS PERSONNELS QUE NOUS TRAITONS</H5>

      <H6>
        Les Renseignements personnels que nous traitons lorsque vous créez votre
        compte
      </H6>
      <P>
        Lorsque votre compte est créé, vous devez nous fournir les
        Renseignements personnels suivants : votre prénom, votre nom, votre
        adresse courriel, un mot de passe de votre choix et le côté de votre
        paralysie faciale
      </P>

      <H6>Finalités et bases légales du traitement</H6>
      <P>
        Nous traitons vos prénom, nom, adresse courriel, et mot de passe car
        vous devez les utiliser pour créer votre compte. La base juridique de ce
        traitement est notre intérêt légitime à sécuriser votre compte et à vous
        identifier en cas de réinitialisation de votre mot de passe.
      </P>
      <P>
        Nous traitons également votre adresse courriel pour vous faire parvenir
        des messages importants à propos du Service, tels que des messages
        relatifs à la sécurité du Service et à la mise à jour de la présente
        Politique. La base juridique de ce traitement est notre intérêt légitime
        à vous transmettre des informations importantes relatives à la sécurité
        ou autres informations importantes relatives au Service ou à des
        modifications à cette Politique.
      </P>
      <P>
        Si vous avez consenti à recevoir des communications de notre part, nous
        traiterons également votre adresse courriel pour vous transmettre de
        telles informations à propos de nous ou du Service. La base juridique de
        ce traitement est votre consentement. Vous pouvez retirer votre
        consentement à tout moment en communiquant avec l’administrateur du
        MEPP, dont les coordonnées apparaissent ci-dessous, ou en cliquant sur
        le lien de retrait du consentement au bas de nos courriels.
      </P>

      <H6>
        Les Renseignements personnels que vous nous transmettez par votre
        utilisation du Service
      </H6>
      <P>
        La fonction principale du Service est d’offrir une plate-forme de
        rééducation faciale à Vous, un clinicien, et à une personne atteinte de
        paralysie faciale (que nous appelons un <b>«&nbsp;Bénéficiaire&nbsp;»</b> aux fins de la
        présente Politique). Dans ce cadre, le Service permet également à
        l’équipe de chercheurs de l’UdeM (les <b>«&nbsp;Chercheurs&nbsp;»</b>) d’amasser des
        données qualitatives et quantitatives de même que des statistiques
        générées automatiquement par suite de l’utilisation du Service.
      </P>
      <P>
        Lors de votre utilisation du Service, vous pourrez utiliser une
        interface permettant de créer une rééducation faciale, laquelle vous
        servira à répertorier les Bénéficiaires avec lesquels vous êtes en
        contact et gérer leurs rééducations faciales. <b>Vous reconnaissez que vous
        êtes responsable, à titre de clinicien, de recueillir un consentement
        libre et éclairé du Bénéficiaire à la collecte des informations
        quantitatives et qualitatives le concernant.</b>
      </P>
      <P>
        Veuillez noter que vous n’êtes pas obligé d’identifier un Bénéficiaire
        ni de fournir des Renseignements personnels le ou la concernant lors de
        la création du dossier de ce Bénéficiaire dans votre espace
        d’intervention et que vous êtes libre de plutôt utiliser un pseudonyme.
        <b>Veuillez noter que ces informations ne sont pas transmises aux
        Chercheurs; en fait, le dossier de chaque Bénéficiaire se voit associé
        un numéro au hasard et ce n’est seulement qu’à cet identifiant qu’ont
        accès les Chercheurs.</b>
      </P>
      <P>
        Pour chaque séance d’exercice, le site web génèrera automatiquement un
        certain nombre de statistiques en lien avec l’utilisation du site (ces
        données qualitatives, quantitatives et statistiques sont collectivement
        désignées les <b>«&nbsp;Données&nbsp;»</b>). Les Données ainsi transmises sont
        enregistrées sur les serveurs du Service et pourront être accessibles
        aux Chercheurs.
      </P>

      <H6>Finalités et bases légales du traitement</H6>
      <P>
        Nous traitons les Données qui sont transmises lors de votre utilisation
        du Service pour les rendre accessibles aux Chercheurs afin qu’ils
        puissent être utilisés à des fins de recherche. La base juridique de ce
        traitement est le consentement obtenu auprès du Bénéficiaire.
      </P>
      <P>
        <b>Vous reconnaissez que vous êtes responsable, à titre de clinicien, de
        recueillir un consentement libre et éclairé du Bénéficiaire à la
        collecte des informations quantitatives et qualitatives le concernant.</b>
        Si ce consentement devait être retiré par le Bénéficiaire, vous devrez
        dès lors cesser d’utiliser le Service en lien avec ce Bénéficiaire.
      </P>

      <H6>Les témoins et autres technologies similaires</H6>
      <P>
        Certains témoins et autres technologies similaires peuvent constituer
        des Renseignements personnels à votre égard. Nous traitons de tels
        témoins et autres technologies similaires pour suivre les activités sur
        le Service et retenir certaines informations pour améliorer le Service
        et l’expérience globale lors de l’utilisation du Service.
      </P>

      <H6>Finalités et bases légales du traitement</H6>
      <P>
        Si vous avez consenti à la collecte d’information par le biais de
        témoins et autres technologies similaires, nous traiterons ces témoins
        et autres technologies similaires, avec l’aide de services analytiques
        tiers, pour les finalités mentionnées à la section <b>«&nbsp;TÉMOINS (COOKIES)
        ET AUTRES TECHNOLOGIES SIMILAIRES&nbsp;»</b> de la présente Politique. La base
        juridique de ce traitement est votre consentement. Vous pouvez retirer
        votre consentement à tout moment en communiquant avec l’administrateur
        dont les coordonnées apparaissent au bas de la présente Politique. Soyez
        par ailleurs assurés que nous n’associons aucun identifiant de témoins
        ou de technologies similaires à des informations relatives à votre
        origine raciale ou ethnique, vos opinions politiques, vos convictions
        religieuses ou philosophiques ou votre appartenance syndicale, votre
        santé, votre vie sexuelle ou votre orientation sexuelle ni à vos données
        génétiques ou biométriques qui pourraient permettre votre identification
        de manière unique.
      </P>

      <H6>Les fichiers journaux (log)</H6>
      <P>
        Nous enregistrons sur les serveurs du Service des fichiers journaux
        (log) qui comprennent certaines informations telles votre adresse IP, la
        date et l’heure de votre utilisation du Service, des témoins qui
        identifient votre navigateur et la langue de celui-ci, ainsi que les
        diverses requêtes aux serveurs et réponses de ceux-ci. Ces fichiers
        peuvent constituer des Renseignements personnels à votre égard.
      </P>

      <H6>Finalités et bases légales du traitement</H6>
      <P>
        Nous traitons les fichiers journaux relatifs à votre utilisation du
        Service afin de comprendre la provenance d’une erreur en cas d’erreur ou
        bug du Service et afin d’établir des statistiques de connexions au
        Service. La base juridique de ces traitements est notre intérêt légitime
        de réduire au maximum le nombre d’interruptions et de défaillances du
        Service lors de votre utilisation de celui-ci.
      </P>

      <H6>Les informations de vos appareils</H6>
      <P>
        Nous colligeons des informations sur les appareils avec lesquels vous
        accédez au Service, tels les identifiants uniques de l’appareil, et les
        informations issues des capteurs de l’appareil (caméra, microphones,
        accéléromètres, gyroscopes, boussoles, etc.). Ces informations peuvent
        constituer des Renseignements personnels à votre égard.
      </P>

      <H6>Finalités et bases légales du traitement</H6>
      <P>
        Nous traitons les informations issues des appareils avec lesquels vous
        accédez au Service pour assurer la cohérence du Service sur tous vos
        appareils supportant le Service. La base juridique de ce traitement est
        notre intérêt légitime à ce que le Service puisse être accessible de
        manière cohérente sur le plus grand nombre possible d’appareils que vous
        possédez.
      </P>

      <H5>
        2. LES CATÉGORIES DE DESTINATAIRES DE VOS RENSEIGNEMENTS PERSONNELS
      </H5>
      <P>
        À l’exception des cas prévus par la loi ou de ceux expressément prévus
        dans la présente Politique, nous ne divulguerons jamais vos
        Renseignements personnels à une tierce partie.
      </P>

      <H6>Fournisseurs de service</H6>
      <P>
        Nous pouvons fournir certains de vos Renseignements personnels à de
        tierces parties afin qu’elles les utilisent dans le cadre de leurs
        fonctions commerciales internes (p. ex., firmes de développement
        logiciel, service à la clientèle, maintenance, sécurité, analyse des
        données, envoi de courriels, tests bêta ou hébergement de données) en
        notre nom. De plus, certains fournisseurs de service de tierce partie
        peuvent recueillir de l’information, y compris des Renseignements
        personnels, en notre nom. Ces fournisseurs de service se sont engagés
        auprès de nous à respecter les lois applicables à vos Renseignements
        personnels ainsi que la présente Politique. Nous ne fournirons à ces
        fournisseurs que les Renseignements personnels dont ils ont besoin pour
        fournir leurs services et il leur est interdit d’utiliser ces
        Renseignements personnels à une autre fin.
      </P>

      <H6>Exigences légales</H6>
      <P>
        Nous pouvons divulguer vos Renseignements personnels si nous estimons de
        bonne foi que cette mesure est requise par une assignation, un mandat,
        ou toute autre décision judiciaire ou administrative rendue conformément
        à la loi. Nous pourrions également divulguer des Renseignements
        personnels si nous estimons de bonne foi que cette mesure est appropriée
        ou nécessaire pour éviter une violation de nos modalités ou conditions
        d’utilisation, de nos ententes de licences d’utilisateurs ou de toute
        autre entente à laquelle vous êtes partie; pour nous prémunir contre une
        réclamation; pour protéger nos droits, notre propriété, notre sécurité
        ou ceux d’un partenaire, d’une personne ou du public; pour maintenir et
        assurer la sécurité et l’intégrité du Service ou de nos infrastructures
        à l’égard d’une utilisation abusive ou illégale; pour nous défendre
        contre des réclamations ou des allégations de tiers; ou pour collaborer
        avec des agences de réglementation gouvernementales ayant juridiction.
      </P>

      <H6>Transfert de propriété</H6>
      <P>
        Les renseignements sur nos utilisateurs, y compris les Renseignements
        personnels, peuvent être divulgués dans le cadre d’une faillite, d’une
        fusion, de la vente ou du transfert des activités reliées au Service,
        d’une acquisition ou d’une transaction semblable. Dans l’éventualité
        d’une telle transaction au cours de laquelle vos Renseignements
        personnels devraient être transférés à une tierce partie, nous
        déploierons des efforts raisonnables pour vous en aviser. Par exemple,
        nous publierons un avis de transfert de Renseignements personnels sur le
        Service et, si nous disposons de votre adresse courriel, nous
        acheminerons un avis de transfert de Renseignements personnels à cette
        adresse. De plus, nous exigerons de la tierce partie recevant vos
        Renseignements personnels dans un tel cadre qu’elle accepte de protéger
        la confidentialité de vos Renseignements personnels d’une façon conforme
        à cette Politique et qu’elle respecte les lois applicables en matière de
        Renseignements personnels. Elle devra par ailleurs s’engager à ne
        traiter vos Renseignements personnels que conformément à cette Politique
        à moins de vous aviser au préalable, et lorsque requis par la loi, en
        obtenant au préalable votre consentement.
      </P>

      <H6>Autres cas</H6>
      <P>
        Nous pouvons transmettre vos Renseignements personnels à des tiers si :
        i) nous avons obtenu votre consentement à le faire, ii) à nos
        conseillers juridiques ou autres, s’ils sont soumis à des obligations de
        confidentialité au moins aussi strictes que celles prévues à la présente
        politique et qu’ils se conforment aux lois applicables en matière de
        Renseignements personnels.
      </P>

      <H5>3. SÉCURITÉ DE VOS RENSEIGNEMENTS PERSONNELS</H5>
      <P>
        Nous prenons des mesures considérables, y compris la mise en œuvre et
        l’application de procédures physiques, électroniques et administratives,
        pour assurer la sécurité, l’intégrité et l’exactitude de l’ensemble des
        Renseignements personnels recueillis. Nos mesures comprennent des
        procédures conçues pour éviter l’accès non autorisé, la modification,
        l’utilisation abusive ou la divulgation de Renseignements personnels.
        Dans l’éventualité d’une brèche dans les systèmes de sécurité, nous
        pourrions tenter de vous envoyer un avis par courriel pour vous
        permettre de prendre les mesures de protection nécessaires.
      </P>
      <P>
        Malgré ce qui précède, les données, y compris les courriels et
        communications Internet, les communications par réseau, téléphone ou
        tout autre moyen électronique peuvent être interceptés illicitement par
        des tiers non autorisés. Nous ne saurions garantir une efficacité et/ou
        une sécurité absolue du Service. Par des moyens détournés et illicites,
        il est entre autres possible qu’un pirate informatique réussisse à
        pénétrer sur les serveurs du Service. Il est donc important de garder à
        l’esprit, avant d’utiliser les fonctionnalités offertes par le Service,
        qu’il est toujours possible qu’un individu malintentionné accède aux
        serveurs du Service et utilise, à ses fins propres, les renseignements
        que vous avez divulgués sur ou via celui-ci.
      </P>

      <H5>4. CONSERVATION DE VOS RENSEIGNEMENTS PERSONNELS</H5>
      <P>
        Nous conservons les Renseignements personnels uniquement pour la durée
        requise afin de poursuivre nos activités commerciales de façon viable ou
        selon ce que nous estimons légalement requis. Plus précisément, tant que
        vous conserverez votre compte, nous conserverons les Renseignements
        personnels qui vous sont demandés pendant un délai de cinq (5) ans
        suivant votre dernière connexion au Service.
      </P>

      <H5>5. CONSENTEMENT</H5>
      <P>
        Avant de nous communiquer tout Renseignement personnel d’un tiers, dont
        les Bénéficiaires, vous reconnaissez avoir obtenu le consentement de la
        personne concernée par ces Renseignements personnels pour faire cette
        communication.
      </P>
      <P>
        En nous fournissant des Renseignements personnels, vous convenez que
        nous pouvons recueillir ou utiliser ces Renseignements personnels
        conformément à la présente Politique et selon les préférences en matière
        de la protection de la confidentialité que vous nous avez indiquées, le
        cas échéant, et tel qu’autorisé ou requis par la loi.
      </P>
      <P>
        Sous réserve d’exigences légales et contractuelles, vous pouvez refuser
        ou retirer votre consentement à l’égard de certaines des fins
        déterminées en tout temps en communiquant avec nous. Si vous refusez ou
        retirez votre consentement, il se peut que nous soyons dans
        l’impossibilité de vous fournir ou de continuer de vous fournir certains
        services ou renseignements qui pourraient vous être utiles.
      </P>

      <H5>6. TÉMOINS (COOKIES) ET AUTRES TECHNOLOGIES SIMILAIRES</H5>

      <H6>Qu’est-ce qu’un témoin?</H6>
      <P>
        Les témoins aussi appelés cookies sont des fichiers textes contenant de
        petites quantités d’information téléchargées sur votre appareil lorsque
        vous visitez un site Web. Les témoins sont ensuite renvoyés sur le site
        Web d’origine à chaque visite suivante, ou sur un autre site Web qui
        reconnaît ce témoin. Les témoins sont utiles, car ils permettent à un
        site Web de reconnaître l’appareil d’un utilisateur. Vous pouvez trouver
        des renseignements sur les témoins à www.allaboutcookies.org.
      </P>
      <P>
        Les témoins servent plusieurs fonctions différentes, comme vous
        permettre de naviguer entre des pages de façon efficace, enregistrer vos
        préférences et améliorer l’expérience utilisateur dans son ensemble. Ils
        peuvent également faire en sorte que les publicités que vous voyez en
        ligne sont plus pertinentes pour vous et vos intérêts. Notre serveur
        installe sur vos appareils un témoin permanent lors d’une première
        visite et, selon les applications utilisées, d’autres témoins permanents
        ou temporaires pourraient être utilisés pour gérer techniquement
        certains choix que vous faites. Soyez assuré qu’aucun Renseignement
        personnel n’est comme tel conservé dans les témoins.
      </P>

      <H6>Choisir de ne pas autoriser les témoins</H6>
      <P>
        Vous pouvez régler votre navigateur afin qu’il vous avise lorsque vous
        recevez un témoin, vous permettant ainsi de décider si vous désirez ou
        non l’accepter.
      </P>

      <H5>7. ADRESSE DE PROTOCOLE INTERNET</H5>
      <P>
        L’adresse de protocole Internet (adresse IP) est associée à la connexion
        Internet de votre appareil par votre fournisseur d’accès Internet. Nous
        pouvons utiliser cette adresse IP afin de, notamment, diagnostiquer des
        problèmes avec ses serveurs Web, gérer le Service et compiler des
        statistiques.
      </P>

      <H5>8. VOS DROITS</H5>

      <H6>Accès à vos Renseignements personnels et portabilité</H6>
      <P>
        De manière générale, nous nous engageons à informer toute personne qui
        en fait la demande de l’existence de Renseignements personnels qui la
        concernent, de l’usage qui en est fait et du fait, le cas échéant,
        qu’ils sont communiqués à des tiers, et lui permettre de les consulter.
        Il sera possible de contester l’exactitude et l’intégralité des
        renseignements et d’y faire apporter les corrections appropriées.
      </P>
      <P>
        Veuillez noter que l’accès à votre dossier comportant vos Renseignements
        personnels est gratuit. Cependant, nous pouvons vous exiger le coût des
        frais raisonnables reliés à la reproduction physique et la transmission
        de ces Renseignements personnels. Si tel est le cas, nous vous
        informerons au préalable de ces coûts.
      </P>
      <P>
        Sans limiter la généralité de ce qui précède, vous avez le droit de
        recevoir les Renseignements personnels vous concernant et que vous nous
        avez fournis, dans un format structuré, couramment utilisé et lisible
        par machine, vous avez le droit de transmettre ces Renseignements
        personnels à un autre responsable du traitement sans que nous y fassions
        obstacle, lorsque i) le traitement est fondé sur votre consentement ou
        sur un contrat conclu entre vous et nous et ii) le traitement est
        effectué à l’aide de procédés automatisés. De plus, lorsque cela est
        techniquement possible, vous pouvez obtenir que ces Renseignements
        personnels soient transmis directement par nous à votre nouveau
        responsable du traitement.
      </P>

      <H6>Exactitude de vos Renseignements personnels et droit à l’oubli </H6>
      <P>
        Les Renseignements personnels que vous nous divulguez doivent être aussi
        complets, exacts et à jour que l’exigent les fins auxquelles ils sont
        destinés. Il vous est permis de faire modifier votre dossier pour
        corriger les renseignements inexacts, incomplets ou équivoques et de
        faire supprimer un renseignement périmé ou non justifié par l’objet du
        dossier, ou formuler par écrit des commentaires et les faire verser à
        votre dossier. La plupart de vos Renseignements personnels peuvent être
        consultés et corrigés en vous connectant à votre compte et en accédant à
        votre profil. Autrement, nous vous invitons à contacter l’administrateur
        dont les coordonnées se trouvent à la fin de la présente Politique afin
        de lui en faire la demande. Sans limiter la généralité de ce qui
        précède, vous avez en tout temps le droit de demander, sauf dans
        certaines circonstances prévues par la loi, l’effacement de vos
        Renseignements personnels si : i) ils ne sont plus nécessaires au regard
        des finalités pour lesquelles ils ont été collectés ou traités d’une
        autre manière; ii) nous avons obtenu de votre part le consentement au
        traitement de ces Renseignements personnels et il n’existe pas d’autre
        fondement juridique au traitement; iii) vous vous opposez au traitement
        sans que nous ayons un motif légitime impérieux pour le traitement, iv)
        ces renseignements personnels ont fait l’objet d’un traitement illicite;
        ou v) ils doivent être effacés pour respecter une obligation légale
        prévue par la loi applicable.
      </P>

      <H6>Limitation du traitement ou le droit de s’opposer au traitement</H6>
      <P>
        Vous avez en tout temps le droit, dans certaines circonstances prévues
        par la législation applicable, de demander à l’administrateur dont les
        coordonnées se trouvent à la fin de la présente Politique que nous
        limitions certains traitements que nous faisons de vos Renseignements
        personnels ou de vous opposer à ces traitements.
      </P>

      <H6>Avis, plaintes et communications</H6>
      <P>
        Par la publication de la présente Politique, nous rendons accessible à
        toute personne des informations précises sur nos politiques et pratiques
        concernant la gestion des Renseignements personnels. Si vous avez des
        questions relatives à cette Politique, n’hésitez pas à communiquer avec
        l’administrateur, lequel est responsable de la Politique et peut être
        rejoint à l’adresse mentionnée à la fin de cette Politique, afin que
        nous puissions y répondre dans la mesure du possible. Nous nous
        réservons le droit de vous demander certaines informations afin de vous
        identifier.
      </P>
      <P>
        En cas de non-respect des principes énoncés à la présente Politique,
        vous pouvez nous adresser une plainte en communiquant l’administrateur
        dont les coordonnées sont ci-bas. Selon votre juridiction (ex. Canada),
        vous pouvez par ailleurs déposer une plainte une auprès d’une autorité
        de contrôle.
      </P>

      <H5>9. MODIFICATIONS DE LA POLITIQUE</H5>
      <P>
        Lorsque nous apporterons, à notre seule discrétion, des changements à
        cette Politique, nous modifierons la date de la <b>«&nbsp;Dernière mise à jour&nbsp;»</b>
        telle que retrouvée ci-dessus.
      </P>

      <P>
        Bien qu’il ne soit pas de notre intention de modifier fréquemment ou
        substantiellement cette Politique, il pourrait arriver que nous le
        fassions pour mieux vous servir à l’avenir ou compte tenu de l’évolution
        de notre offre de services, de la technologie ou de la loi. Nous vous
        invitons à en revoir le contenu régulièrement afin d’être avertis de
        tout changement à la Politique. Si les changements s’avèrent
        substantiels, nous vous enverrons une notification via le Service ou par
        tout autre moyen afin que vous puissiez prendre connaissance des
        modifications avant de poursuivre votre utilisation du Service. Si vous
        désapprouvez une ou plusieurs modifications, vous devez cesser
        l’utilisation du Service. L’utilisation par vous du Service
        postérieurement à l’affichage ou à la communication de telles
        modifications vaudra acceptation de la Politique révisée.
      </P>

      <P>
        <b>Pour toute question ou commentaire concernant cette Politique, n’hésitez
        pas à entrer en contact avec l’administrateur&bnsp;:</b>
      </P>
      <P>
        Sarah Martineau
        <BR/>
        5415 Boulevard de l’Assomption,
        <BR/>
        Montréal, QC H1T 2M4
        <BR/>
        Courriel&nbsp;: <a href="mailto:info@mirroreffectplus.org">info@mirroreffectplus.org</a>
      </P>

      <ButtonsWrapper>
        <LoginLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '#/login';
          }}
        >
          {t('cta:goto_login')}
        </LoginLink>
      </ButtonsWrapper>

    </>
  );
};

const PrivacyEn = ({t}) => {
  return (
    <>
      <H3>PERSONAL DATA PROTECTION POLICY</H3>
      <P>Latest update: December 2021</P>
      <P>
        The MEPP team, the University of Montreal, the CIUSSS of North Montreal Island as well as of the East Montreal
        Island (or <b>“we”</b>) the protection of your personal data as well as your privacy greatly matter so us and we
        want
        your experience with us and the MEPP platform (the <b>“Service”</b>) to be as satisfactory and as safe as
        possible. You
        understand that by using the Service, the Service will be provided to you by MEPP and that the personal data
        that you may provide us may be used for the purposes specified in this document.
      </P>
      <P>
        For the purpose of this personal data protection policy (the <b>“Policy”</b>), the expression <b>“Personal
        data“</b> means any information pertaining to a physical person who is identified or identifiable. An
        identifiable person is a person who can be identified, directly or indirectly, by reference to one or several
        specific elements, particular to their physical, physiologic, genetic, psychologic, economic, cultural, or
        social identity.
      </P>
      <P>
        This policy informs you about i) the types of personal data that we process through the Service, ii) the
        purposes of the processing and the legal basis of such processing and iii) the duration this personal data is
        kept. This Policy also informs you on the categories of persons wo whom we may transmit your personal Data and
        in which circumstances we may do so Additionally, you will find the rights pertaining to your personal Data that
        you may practice with us. We will only process your personal Data on the contractual basis of this Policy.
      </P>
      <P>
        We adjust our practice in matters of respect of personal Data all the time for them to always comply with the
        principles of the <i>Law on personal data and electronic documents protection</i> (Canada), of the <i>Law on the
        personal data in the private sector</i> (Quebec) and of any other similar applicable law.
      </P>

      <H5>1. CATEGORY OF PERSONAL DATA THAT WE PROCESS</H5>

      <H6>
        The personal Data that we process when you create your account
      </H6>
      <P>
        When your account is created, you must provide us the following personal Data: your first name, your last name,
        your email address, a password of your choice and the side of your facial paralysis.
      </P>

      <H6>Purposes and legal bases of the processing</H6>
      <P>
        We process your first name, last name, email address and password because you must use them to create your
        account. The legal basis of this processing is our legitimate interest in securing your account and to identify
        you in case of reinitialization of your password.
      </P>
      <P>
        We also process your email address to send you important messages about the Service, such as messages pertaining
        to the security of the Service and the update of this Policy. The legal basis of this processing is our
        legitimate interest to send you important information pertaining to the safety or any important information
        pertaining to the Service or to modifications of this Policy.
      </P>
      <P>
        If you agreed to receive communications from us, we will also process your Email address to send you such
        information about us or the Service. The legal basis of this processing is your consent. You can withdraw your
        consent at any time by contacting the administrator of the MEPP, whose contact information appear below, or by
        clicking on the consent withdrawal link at the bottom of our emails.
      </P>

      <H6>
        The personal Data that you give us through your use of the Service
      </H6>
      <P>
        The main function of the Service is to provide you, a clinician, and a person suffering from facial paralysis
        (who we call a <b>“Beneficiary”</b> for the purpose of this Policy) with a reeducation platform a facial
        reeducation platform. In this framework, the Service also allows the researchers team of UdeM (the
        “Researchers”) to collect qualitative and quantitative data as well as statistics automatically generated
        following the use of the Service.
      </P>
      <P>
        During your use of the Service, you can use an interface allowing you to create a facial reeducation, which will
        be used for you to make a list of Beneficiaries with whom you are in contact and manage their facial
        reeducations. <b>You acknowledge that you are responsible, as a clinician, for collecting a free and enlightened
        consent from the Beneficiary to collect quantitative and qualitative data pertaining to them</b>.
      </P>
      <P>
        Please note that you do not have to identify a Beneficiary or provide personal Data pertaining to them when you
        create the file for this Beneficiary in your intervention space and that you are free to use a pseudonym
        instead. <b>Please note that this data is not transmitted to the Researchers; in fact, the file of each
        Beneficiary is associated with a random number and Researchers only have access to this identifier</b>.
      </P>
      <P>
        For each exercise session, the website will automatically generate a certain number of statistics in relation
        with the use of the website (this qualitative, quantitative, and statistical data is collectively designated
        the <b>“Data”</b>). The Data transmitted is saved on the servers of the Service and can be accessed by the
        Researchers.
      </P>

      <H6>Purposes and legal basis of the processing</H6>
      <P>
        We process the Data transmitted to us during your use of the Service to make them accessible to the Researchers
        for them to be used for research purposes. The legal basis of this processing is the consent obtained from the
        Beneficiary.
      </P>
      <P>
        <b>You acknowledge that you are responsible, as a clinician, for collecting a free and enlightened consent from
          the Beneficiary to collect quantitative and qualitative data pertaining to them.</b>
        If this consent were to be withdrawn by the Beneficiary, you must then stop using the Service in relation to
        this Beneficiary.
      </P>

      <H6>Cookies and other similar technologies</H6>
      <P>
        Some cookies and other similar technologies may constitute personal Data in your regard. We process such
        indicators and similar technologies to track the activities on the Service and retain certain information to
        improve the Service and the global experience during the use of the Service.
      </P>

      <H6>Purposes and legal basis of the processing</H6>
      <P>
        If you consented to the collection of information through the cookies and other similar technologies, we will
        process these indicators and other similar technologies with the help of third party analytical services, for
        the purpose mentioned in the “COOKIES AND OTHER SIMILAR TECHNOLOGIES” section of this Policy. The legal basis of
        this processing is your consent. You can withdraw your consent at any time by contacting the administrator whose
        contact information appear at the bottom of this Policy. In addition, be assured that we do not associate any
        cookies identifier or similar technologies to information pertaining to your racial or ethnic origin, your
        political opinions, your religious or philosophical beliefs or your syndical affiliations, your health, your
        sexual life, or your sexual orientation nor your genetic or biometric data which may facilitate your
        identification in a unique manner.
      </P>

      <H6>Log files</H6>
      <P>
        We save the log files on the Service’s servers which contain some data such as your IP address, the date and
        time of your use of the Service, the cookies identifying your browser and its language, as well as various
        request to the servers and their responses. These files may constitute personal Data about you.
      </P>

      <H6>Purposes and legal basis of the processing</H6>
      <P>
        We process log files pertaining to your use of the Service to understand origin of an error or a bug in the
        Service and to establish Service connection statistics. The legal basis of this processing is our legitimate
        interest to reduce the number of interruptions and failures of the Service during your use of it as much as
        possible.
      </P>

      <H6>Your devices’ data</H6>
      <P>
        We collect data on the devices with which you access the Service, such as the unique ID of the device, and
        information from the device’s captors (camera, microphones, accelerometers, gyroscopes, compasses, etc.). This
        data may constitute personal Data about you.
      </P>

      <H6>Purposes and legal basis of the processing</H6>
      <P>
        We process the data from the devices with which you access the Service to ensure the cohesion of the Service on
        all your devises supporting the Service. The legal basis of this processing is our legitimate interest for the
        Service to be accessible in a coherent manner on as many devices that you own as possible.
      </P>

      <H5>
        2. THE CATEGORIES OF RECIPIENTS OF YOUR PERSONAL DATA
      </H5>
      <P>
        Except for the cases prescribed by the law or those expressly prescribed in this Policy, we never disclose your
        personal Data to a third party.
      </P>

      <H6>Service providers</H6>
      <P>
        We may provide some of your personal Data to third parties for them to use them within the framework of their
        internal commercial functions (for example, software development firms, customer service, maintenance, security,
        data analysis, email expedition, beta tests or data hosting) on your behalf. In addition, some third-party
        service providers may collect data, including personal Data on your behalf. These service providers committed to
        comply with the applicable laws regarding your personal Data as well as this Policy. We will only provide these
        providers with the personal Data they need to provide their services and they are forbidden from using this
        personal Data for another purpose.
      </P>

      <H6>Legal requirements</H6>
      <P>
        We may disclose your personal Data if we deem in good faith that this measure is required by summons, a mandate
        or any other legal or administrative decision rendered in compliance with the law. We may also disclose personal
        Data if we deem in good faith that this measure is appropriate or necessary to avoid a breach of our modalities
        or terms of use, our user licenses agreements or any other agreement you are a part of; to protect ourselves
        from a claim; to protect our rights, our property, our safety or that of a partner, a person or the public; to
        maintain and ensure the safety and integrity of the Service or of our infrastructures regarding an abusive or
        illegal use; to defend ourselves against claims or allegations of a third party; or to collaborate with the
        governmental regulatory agencies who have jurisdiction.
      </P>

      <H6>Property transfer</H6>
      <P>
        The data about our users, including the personal Data may be disclosed within the framework of a bankruptcy, a
        merger, the sale or transfer of the activities linked to the Service, an acquisition or a similar transaction.
        In the eventuality of such a transaction during which your personal Data shall be transferred to a third party,
        we will make reasonable efforts to notify you. For example, we will publish a notice of transfer of personal
        Data on the Service and, if we have your email address, we will send a notice of transfer of your personal Data
        to this address. In addition, we will require from the third party receiving your personal Data in such a
        framework that they agree to protect the confidentiality of your personal Data in manner in compliance with this
        Policy and that they respect the applicable laws in matters of personal Data. They must also commit to only
        process your personal Data in compliance with
        this Policy unless they notify beforehand, and when required by the law, by obtaining your consent beforehand.
      </P>

      <H6>Other cases</H6>
      <P>
        We may transmit your personal Data to third parties if: i) we obtained your consent to do so, ii) to our legal
        advisors or others, if they are subject to confidentiality obligations at least as strict as those prescribed by
        this policy and that they comply with the applicable laws in matters of personal Data.
      </P>

      <H5>3. SECURITY OF YOUR PERSONAL DATA</H5>
      <P>
        We take considerable measures, including the implementation and application of physical, electronic, and
        administrative procedures, to ensure the security, the integrity and the accuracy of all of the personal Data
        collected. Our measures include procedures designed to avoid the non-authorized access, the modification, the
        abusive use or the disclosure of personal Data. In the eventuality of a breach in the security systems, we may
        attempt to send you a notice by Emil to allow you to take the necessary protection measures.
      </P>
      <P>
        Despite what precedes, the data, including emails and internet communications, the network communications,
        telephone communications or any other electronic mean may be intercepted illicitly by unauthorized third
        parties. We cannot guarantee an absolute efficiency and/or security of the Service. Through diverted and illicit
        means, it is for instance possible for a hacker to succeed in entering into the Service’s servers. It is
        therefore important to keep in mind, before using the functionalities offered by the Service, that it is always
        possible for a malevolent individual to access the Service’s servers and use for their own purposes, the data
        you disclosed on or via the latter.
      </P>

      <H5>4. STORAGE OF YOUR PERSONAL DATA</H5>
      <P>
        We store the personal Data only for the duration required to be able to continue our commercial activities in a
        viable manner or according to what we deem to be legally required. More precisely, for as long as you keep your
        account, we will keep the personal Data which are requested from you for a duration of five (5) years following
        your last connection to the Service.
      </P>

      <H5>5. CONSENT</H5>
      <P>
        Before providing us any personal Data for a third party, including the Beneficiaries, you acknowledge having
        obtained the consent of the person who this personal Data pertains to, to provide them.
      </P>
      <P>
        By providing us with this personal Data, you agree that we may collect or use this personal Data in compliance
        with this Policy and according to the preferences in matter of confidentiality protection that you specified,
        when applicable, and as authorized or required by the law.
      </P>
      <P>
        Subject to legal and contractual requirements, you may refuse or withdraw your consent regarding some of the
        purposes determined at any time by contacting us. If you refuse or withdraw your consent, it is possible that we
        may not be able to provide or continue to provide some services or information which may be useful to you.
      </P>

      <H5>6. COOKIES AND OTHER SIMILAR TECHNOLOGIES</H5>

      <H6>What is a cookie?</H6>
      <P>
        Cookies are text files containing small quantities of information downloaded on your device when you visit a
        website. The cookies are then transferred to the original Website upon each following visit, or on another
        website which recognizes this cookie. Cookies are useful, because they allow a Website to recognize a user’s
        device. You can always find information regarding the cookies on allaboutcookies.org.
      </P>
      <P>
        The cookies have several different functions, like allowing you to browse between pages efficiently, save your
        preferences and improve the user experience. They may also ensure that the advertisements you see online are
        more pertinent to you and your interests. Our server installs a permanent cookie on your devices during your
        first visit and, depending on the applications used, other permanent or temporary cookies may be used to
        technically manage some choices you make. Rest assured that no personal Data is kept as such in the cookies.
      </P>

      <H6>Choosing to not authorize cookies</H6>
      <P>
        You can set up your browser for it to notify you when you receive a cookie, therefore allowing you to decide if
        you wish to accept it or not.
      </P>

      <H5>7. INTERNET PROTOCOL ADDRESS</H5>
      <P>
        The internet protocol address (IP address) is associated to your device’s internet connection by your internet
        access provider. We may use this IP address to, notably, diagnose issues with its web servers, manage the
        Service and compile statistics.
      </P>

      <H5>8. YOUR RIGHTS</H5>

      <H6>Access to your personal Data and portability</H6>
      <P>
        Generally, we commit to inform any person requesting it of the existence of personal Data pertaining to them, of
        the use of it and of the fact, when applicable, that they are provided to third parties, and allow them to
        consult them. It will be possible to contest the accuracy and integrality of the information and to make
        appropriate corrections.
      </P>
      <P>
        Please note that the access to your file containing your personal Data is free However, we may require the cost
        of the reasonable fees linked to the physical reproduction and the transmission of this personal Data. If that
        is the case, we will inform you of these costs beforehand.
      </P>
      <P>
        Without limiting the generality of what precedes, you have the right to receive the personal Data pertaining to
        you and that you provided us, in a structured format, commonly used and machine readable, you have the right to
        transmit this personal Data to another person in charge of the processing without us standing in the way, when
        i) the processing is founded on your consent or a contract concluded between you and us and ii) the processing
        is done through automated processes. In addition, when it is technically possible, you may obtain for this
        personal Data to be directly transmitted by us to your new person in charge of the processing.
      </P>

      <H6>Accuracy of your personal data and right to right to be forgotten</H6>
      <P>
        The personal Data that you disclose to us must be as complete, accurate and up to date as required by the
        purposes for which they are destined. You are allowed to get them modified in your file to correct inaccurate,
        incomplete or equivoque data and to delete an expired or unjustified data for the subject of the file. Most of
        your personal Data may be consulted and corrected by connecting to your account and accessing your profile.
        Otherwise, we invite you to contact the administrator whose contact information is located at the end of this
        Policy to request for them to do it. Without limiting the generality of what precedes, you have, at any time,
        the right to request, except in some circumstances prescribed by the law, the deletion of your personal Data if:
        i) it is no longer necessary in regard to the purposes for which they were collected or processed in another
        manner; ii) we obtained from you the consent to the processing of this personal Data and there is no other legal
        basis to the processing; iii) you oppose the processing without us having a legitimate imperious reason for the
        processing; iv) this personal data is the subject of an illicit processing; or v) they must be deleted to comply
        with a legal obligation prescribed by the applicable law.
      </P>

      <H6>Limitation of the processing or the right to oppose to the processing</H6>
      <P>
        You have, at any time, the right, in some circumstances prescribed by the applicable legislation, to request for
        the administrator whose contact information is located at the end of this Policy to limit some processing we
        make of your personal Data or to oppose to their processing.
      </P>

      <H6>Notifications, complaints and communication</H6>
      <P>
        Through the publication of this Policy, we make precise information about our policies and practices regarding
        the management of personal Data to anyone. If you have questions pertaining to this Policy, do not hesitate to
        contact the administrator who is responsible for the Policy and can be contacted at the address mentioned at the
        end of this Policy, for us to be able to reply if possible. We reserve the right to ask you for some information
        to identify you.
      </P>
      <P>
        In case of non-compliance with the principles listed in this Policy, you may address a complaint by contacting
        the administrator whose contact information is below. Depending on your jurisdiction (ex: Canada), you can also
        make a complaint with a control authority
      </P>

      <H5>9. MODIFICATIONS OF THE POLICY</H5>
      <P>
        When we make, at our discretion, any changes to this Policy, we will modify the date of the “latest update” as
        found above.
      </P>

      <P>
        Although it is not our intention to frequently or substantially modify this Policy, it may happen that we do it
        to better serve you in the future or given the evolution of our offer of services, the technology, or the law.
        We invite you to review its content regularly to be notified of any change to the Policy. If the changes are
        substantial, we will send you a notification via the Service or via any other mean so you can take note of the
        modifications before continuing your use of the Service. If you disapprove of one or more modifications, you
        must stop using the Service. Your use of the Service after the display or the communication of such
        modifications will be considered as acceptation of the revised Policy.
      </P>

      <P>
        <b>For any question or comment regarding this Policy, please do not hesitate to contact the administrator:</b>
      </P>
      <P>
        Sarah Martineau
        <BR/>
        5415 Boulevard de l’Assomption,
        <BR/>
        Montréal, QC H1T 2M4
        <BR/>
        <P>Courriel&nbsp;: <a href="mailto:info@mirroreffectplus.org">info@mirroreffectplus.org</a></P>
      </P>

      <ButtonsWrapper>
        <LoginLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '#/login';
          }}
        >
          {t('cta:goto_login')}
        </LoginLink>
      </ButtonsWrapper>
    </>
  );
};

const ContainerWrapper = styled(Wrapper)`
  position: relative;
  padding-top: 120px;
  padding-bottom: ${spacings.default * 2}px;

  ${media.xsOnly`
    padding-top: 0px;
  `}

  @media screen and (max-height: 850px) {
    padding-top: 0px;
  }
`;

const ContainerInner = styled.div``;

const ButtonsWrapper = styled.div`
  ${FlexAlignMiddle.CSS}
  flex-direction: column;
`;

const LoginLink = styled(Href)`
  margin: ${spacings.default * 2}px 0 0;
`;

export default PrivacyPage;
