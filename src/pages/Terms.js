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

import { media } from '../styles/configs/breakpoints';
import { spacings } from '../styles/configs/spacings';
import { FlexAlignMiddle, Wrapper } from '../styles/tools';

import { useLocale } from '../hooks/locale/useLocale';
import { useTrackingView } from '../hooks/useTrackingView';

import { Language } from '../utils/constants';

import BasicLayout from '../layouts/Basic';

import { Footer } from '../components/footer/Footer';
import { H3, H5, P, UL, LI, Href } from '../components/generics/basics/index';
import { Header } from '../components/header/Header';

/**
 * Terms of use page with BasicLayout
 */
const TermsPage = () => {
  const { locale } = useLocale();
  const { t } = useTranslation();
  useTrackingView('/termofuse');

  return (
    <BasicLayout
      header={<Header />}
      content={
        <ContainerWrapper>
          <ContainerInner>
            {locale === Language.FR ? <TermFr t={t} /> : <TermEn t={t} />}
          </ContainerInner>
        </ContainerWrapper>
      }
      footer={<Footer />}
    />
  );
};

const TermFr = ({ t }) => {
  return (
    <>
      <H3>CONDITIONS D’UTILISATION</H3>
      <P>Dernière mise à jour : Décembre 2021</P>

      <H5>1. Champ d’application</H5>
      <P>
        Ces conditions générales (ci-après les <b>«&nbsp;Conditions&nbsp;»</b>)
        constituent une entente légale entre vous (<b>«&nbsp;vous&nbsp;»</b> ou
        l’<b>«&nbsp;Utilisateur&nbsp;»</b>) et l’équipe du MEPP, faisant
        également affaires sous le nom MEPP(<b>«&nbsp;MEPP&nbsp;»</b> ou{' '}
        <b>«&nbsp;nous&nbsp;»</b>) et encadrent l’utilisation de la plateforme{' '}
        <b>«&nbsp;MEPP&nbsp;»</b>, comprenant un site web et une application
        mobile (le <b>«&nbsp;Service&nbsp;»</b>).
      </P>
      <P>
        VEUILLEZ LIRE ATTENTIVEMENT TOUTES LES CONDITIONS AVANT D’UTILISER LE
        SERVICE.
      </P>

      <H5>2. Acceptation des Conditions</H5>
      <P>
        En acceptant les Conditions, vous acceptez d’être lié, sans réserve ni
        restriction, par les modalités et stipulations des Conditions. L’accès
        et l’utilisation du Service sont subordonnés au respect intégral et sans
        réserve de ces Conditions.
      </P>
      <P>
        Si vous ne souhaitez pas être lié par ces Conditions ou si vous ne les
        acceptez pas intégralement, vous devez vous abstenir d’accéder au
        Service ou de l’utiliser.
      </P>
      <P>
        Sous réserve des termes des présentes Conditions, MEPP vous accorde
        pendant la durée de l’entente documentée par ces Conditions :
      </P>
      <UL>
        <LI>
          un droit d’accéder aux composantes web du Service et d’en utiliser les
          fonctionnalités; et
        </LI>
        <LI>
          une licence non transférable, non exclusive, pour (a) utiliser pour
          votre usage personnel, et (b) copier, aux fins de téléchargement,
          d’installation et d’exécution, le nombre de copies pour lesquelles
          vous êtes autorisé par le site de téléchargement de l’application, sur
          un appareil mobile que vous possédez ou contrôlez pour votre usage
          personnel de s’en service pour accéder à et utiliser le Service;
        </LI>
      </UL>

      <H5>3. Droits d’auteur</H5>
      <P>
        À l’exclusion des images, photos, fichiers musicaux ou vidéos diffusés à
        l’aide de l’application mobile associée au Service (le{' '}
        <b>«&nbsp;Contenu audio-visuel&nbsp;»</b>), lesquels demeurent la
        propriété de leurs ayants-droit respectifs, le Service et ses
        composantes sont utilisés par MEPP sous licence de tiers et peuvent être
        protégés par les lois en matière de propriété intellectuelle, dont la
        Loi sur le droit d’auteur (L.R.C. (1985), ch. C-42).
      </P>
      <P>
        Outre les droits d’utilisation qui vous sont consentis aux termes des
        présentes Conditions, MEPP réserve, en son nom propre ou en celui de ses
        concédants de licence, tous ses droits à l’égard du Service. En
        conséquence, il vous est interdit de copier, reproduire, modifier,
        reformuler, rééditer et, plus généralement, d’utiliser les éléments
        composant le Service, tant de façon partielle que totale, sans avoir au
        préalable obtenu l’autorisation écrite de MEPP.
      </P>

      <H5>4. Vos obligations</H5>
      <P>
        En utilisant le Service, sans limiter la portée de ce qui est autrement
        prévu aux Conditions, vous acceptez (i) de respecter toutes les lois qui
        vous sont applicables dans votre territoire de résidence, (ii) de nous
        communiquer des informations exactes et de les tenir à jour et (iii)
        d’utiliser le Service d’une façon raisonnable et responsable.
      </P>
      <P>Par ailleurs, vous vous engagez à ne pas :</P>
      <UL>
        <LI>a) utiliser le Service à des fins illégales ou illicites;</LI>
        <LI>
          b) violer les droits de propriété intellectuelle de MEPP ou d’autrui,
          incluant son concédant de licence, notamment les brevets, les marques
          de commerce, les secrets commerciaux, les licences, les droits
          d’auteur ou d’autres droits de propriété;
        </LI>
        <LI>
          c) surveiller la disponibilité, la performance ou la fonctionnalité du
          Service à des fins concurrentielles;
        </LI>
        <LI>
          d) utiliser des logiciels, appareils, robots de codage manuels ou
          automates ou d’autres moyens pour accéder, décomposer, analyser ou
          indexer les fonctionnalités du Service ou tout service, donnée ou
          information connexe;
        </LI>
        <LI>
          e) transmettre du code de nature destructive susceptible d’endommager,
          d’intercepter subrepticement ou d’exproprier un système, des données
          ou des renseignements personnels ou encore d’interférer de façon
          préjudiciable avec ceux-ci;
        </LI>
        <LI>f) contourner toute fonctionnalité de sécurité du Service;</LI>
        <LI>
          g) utiliser le Service pour un usage auquel il n’est pas destiné,
          notamment pour des fins commerciales.
        </LI>
      </UL>

      <H5>5. Liens aux sites ou ressources de tiers</H5>
      <P>
        Vous pourriez trouver sur le Service des hyperliens menant à des sites
        web ou autres ressources qui ne sont pas sous le contrôle ou la
        responsabilité de MEPP. MEPP ne dispose d’aucun moyen pour contrôler ces
        sites web et ne répond pas de la disponibilité, de la fiabilité ou de la
        légalité de tels sites web ni ne les garantit. MEPP ne cautionne ni
        n’approuve les contenus auxquels ces sites web donnent accès et exclut
        toute responsabilité et garantie en ce qui les concerne. L’Utilisateur
        qui accède aux sites Web tiers le fait entièrement à ses risques.
      </P>

      <H5>6. Soumission d’idées</H5>
      <P>
        Vous reconnaissez que vos commentaires, suggestions, idées ou
        propositions relatifs au Service, à ses fonctionnalités ou aux activités
        commerciales dans lesquelles est engagée MEPP, que vous soumettez à MEPP
        (les «&nbsp;Suggestions&nbsp;»), ne sont pas confidentiels et peuvent
        être divulgués, utilisés, adaptés ou appliqués par eValorix sans aucune
        obligation de rémunération ni toute autre forme de rétribution.
      </P>

      <H5>7. Exonération de garanties</H5>
      <P>
        LE SERVICE SONT FOURNIS TELS QUELS. LORSQUE VOUS UTILISEZ LE SERVICE,
        VOUS RECONNAISSEZ ET CONVENEZ QUE VOUS LE FAITES ENTIÈREMENT À VOS
        PROPRES RISQUES ET PÉRILS. LE SERVICE PEUT ÊTRE ABANDONNÉ OU SON ACCÈS
        PEUT ÊTRE INTERROMPU À TOUT MOMENT PAR MEPP OU AUTREMENT. MEPP NE
        FORMULE AUCUNE DÉCLARATION NI GARANTIE QUANT AU SERVICES OU
        FONCTIONNALITÉS OFFERTES SUR LE SERVICE, Y COMPRIS, NOTAMMENT :
      </P>
      <UL>
        <LI>
          A) QUANT À L’EXACTITUDE, L’EFFICACITÉ, À LA DISPONIBILITÉ, À
          L’EXHAUSTIVITÉ, À LA FIABILITÉ, À L’OPPORTUNITÉ DU SERVICE;
        </LI>
        <LI>
          B) QUANT AU FONCTIONNEMENT OU À L’ACCESSIBILITÉ DU SERVICE SANS
          INTERRUPTION NI ERREUR;
        </LI>
        <LI>
          C) QUANT À LA CORRECTION DES DÉFAUTS OU DES ERREURS DANS LE SERVICE;
        </LI>
        <LI>
          D) QUANT À L’ABSENCE DE VIRUS OU D’ÉLÉMENTS DOMMAGEABLES DANS LE
          SERVICE;
        </LI>
        <LI>
          E) QUANT À LA TRANSMISSION SÉCURITAIRE OU SANS INTERCEPTION DES
          COMMUNICATIONS PAR L’INTERMÉDIAIRE DU SERVICE.
        </LI>
      </UL>

      <H5>8. Limitation de responsabilité</H5>
      <P>
        DANS LA PLEINE MESURE PERMISE PAR LES LOIS APPLICABLES, MEPP, SON
        CONCÉDANT DE LICENCE, L’UNIVERSITÉ DE MONTRÉAL (
        <b>«&nbsp;UdeM&nbsp;»</b>) ET LEURS DIRIGEANTS, ADMINISTRATEURS, AGENTS,
        REPRÉSENTANTS, EMPLOYÉS, CHERCHEURS, ÉTUDIANTS, MANDATAIRES, PARTENAIRES
        COMMERCIAUX ET LEURS SUCCESSEURS ET AYANTS CAUSE RESPECTIFS, NE
        SAURAIENT EN AUCUN CAS ÊTRE TENUS RESPONSABLES DE QUELQUE DOMMAGE
        INDIRECT, DE SOURCE CONTRACTUELLE OU EXTRACONTRACTUELLE (Y COMPRIS LA
        NÉGLIGENCE) OU AUTREMENT, MÊME SI L’UdeM CONNAISSAIT OU AURAIT DÛ
        CONNAÎTRE LA POSSIBILITÉ DE TELS DOMMAGES OU PERTES. PAR AILLEURS, MEPP
        N’A AUCUNE OBLIGATION DE CONSERVER OU DE STOCKER LES DONNÉES QUE VOUS
        AMASSEZ PAR VOTRE UTILISATION DU SERVICE ET NE SAURAIT ÊTRE TENUE
        RESPONSABLE DE QUELQUE PERTE OU DOMMAGE RÉSULTANT D’UNE PERTE DE CES
        DONNÉES.
      </P>
      <P>
        SI VOUS DÉCIDEZ D’UTILISER LE SERVICE, VOUS LE FAITES ENTIÈREMENT À VOS
        PROPRES RISQUES.
      </P>
      <P>
        IL SE PEUT QUE LE PRÉSENT ARTICLE NE VOUS SOIT PAS APPLICABLE, EN TOUT
        OU EN PARTIE EN RAISON D’UNE LOI RÉGISSANT LES DROITS DES CONSOMMATEURS
        OU D’UNE AUTRE LOI D’ORDRE PUBLIC QUI POURRAIT ÊTRE APPLICABLE À VOTRE
        SITUATION.
      </P>

      <H5>9. Indemnisation</H5>
      <P>
        MEPP n’est pas responsable des actions que vous posez ou que vous vous
        abstenez de poser en lien avec le Service (vos{' '}
        <b>«&nbsp;Actes&nbsp;»</b>).
      </P>
      <P>
        Vous acceptez que vos Actes soient sous votre seule et unique
        responsabilité et reconnaissez les avoir effectués en connaissance de
        cause. MEPP ne pourrait être considérée comme responsable de toute
        transgression aux Conditions que vous avez ou pourriez avoir commise.
      </P>
      <P>
        En conséquence, vous acceptez d’indemniser et de dégager de toute
        responsabilité MEPP, son concédant de licence, l’UdeM, leurs filiales et
        sociétés affiliées, administrateurs, dirigeants, agents, représentants,
        employés, chercheurs, étudiants, partenaires commerciaux, mandataires et
        leurs successeurs et ayants cause respectifs à l’égard des pertes,
        obligations, réclamations, demandes, dommages, coûts et dépenses de
        toute nature que ce soit, y compris les honoraires d’avocat
        raisonnables, relativement à vos Actes ainsi qu’à toute violation des
        Conditions, de toute loi ou des droits d’un tiers.
      </P>

      <H5>10. Durée et résiliation</H5>
      <P>
        Les présentes Conditions entrent en vigueur à la date à laquelle vous
        les acceptez (telle que décrit dans le préambule). Nonobstant ce qui
        précède, si vous avez utilisé le Service avant la date à laquelle vous
        avez accepté ces Conditions (tel que décrit dans le préambule), vous
        reconnaissez et acceptez par les présentes que ces Conditions sont
        entrées en vigueur à la date à laquelle vous avez utilisé pour la
        première fois le Service (qui est la plus ancienne et qui peut être
        antérieure à la date de version des Conditions) et resteront en vigueur
        tant que vous utiliserez le Service, à moins qu’il n’y soit mis fin plus
        tôt conformément aux Conditions .
      </P>
      <P>
        Nous pouvons (a) suspendre vos droits d’utilisation du Service ou (b)
        résilier les Conditions, à tout moment, pour quelque raison que ce soit,
        à notre seule discrétion, avec ou sans préavis, y compris si nous
        croyons de bonne foi que vous avez manqué à vos obligations aux termes
        des Conditions. Sans limiter ce qui précède, MEPP se réserve le droit de
        résilier le droit d’utilisation consenti à tout utilisateur qui enfreint
        les droits d’auteur d’un tiers sur notification à MEPP par le titulaire
        des droits d’auteur ou son représentant légal.
      </P>
      <P>
        De votre côté, vous pouvez mettre fin à l’entente qui vous lie à MEPP en
        demandant à l’administrateur de fermer votre compte sur le Service et en
        cessant d’utiliser l’application mobile et les composantes web du
        Service.
      </P>

      <H5>11. Mineurs de moins de 16 ans</H5>
      <P>
        Si vous êtes âgé de moins de 16 ans, vous ne pouvez pas utiliser le
        Service.
      </P>

      <H5>12. Juridiction et lois applicables</H5>
      <P>
        Les Conditions sont régies et interprétées par les lois du Québec et du
        Canada qui y sont applicables, sans égard au principe de conflit de
        lois.
      </P>
      <P>
        Ce paragraphe ne s’applique pas aux consommateurs de la province de
        Québec (Canada), auxquels s’applique plutôt la Loi sur la protection du
        consommateur (Québec) (chapitre P-40.1). Vous acceptez et reconnaissez
        irrévocablement la compétence exclusive des tribunaux de juridiction
        fédérale et provinciale, siégeant dans et pour le district judiciaire de
        Montréal relativement à tout litige à naître découlant des Conditions ou
        y étant lié, vous y élisez domicile et renoncez à toute objection fondée
        sur l’absence de compétence territoriale ou à toute demande fondée sur
        la notion de forum non conveniens.
      </P>

      <H5>13. Divisibilité</H5>
      <P>
        Chacune des dispositions des Conditions est individuelle et distincte
        et, si l’une ou l’autre des Conditions était jugée invalide, illégale ou
        inapplicable, l’ensemble des autres dispositions des Conditions
        conserveraient pleine vigueur et plein effet.
      </P>

      <H5>14. Renonciation</H5>
      <P>
        Le fait que MEPP n’insiste pas sur la pleine exécution d’une obligation
        prévue par ces Conditions ou n’exerce pas un droit qui lui est conféré
        ne sera pas considéré comme une renonciation à l’exécution de cette
        obligation ou à ce droit. Toute renonciation par MEPP à un droit qui lui
        est conféré aux termes de ces Conditions ne vaudra que si elle est
        établie par un écrit signé et ne vaudra qu’à l’égard du droit et des
        circonstances expressément visés par cette renonciation.
      </P>

      <H5>15. Modification</H5>
      <P>
        Le Service est un environnement dynamique sujet à changements. Lorsque
        MEPP, à sa seule discrétion, apportera des changements à ces Conditions,
        nous modifierons la date de la <b>«&nbsp;Dernière mise à jour&nbsp;»</b>{' '}
        telle que retrouvée ci-dessus. Bien qu’il ne soit pas de notre intention
        de modifier fréquemment ou substantiellement ces Conditions, il pourrait
        arriver que nous le fassions pour mieux vous servir à l’avenir ou pour
        tenir compte de l’évolution de notre offre de services, de la
        technologie ou de la loi. Nous vous invitons à en revoir le contenu
        régulièrement afin d’être avertis de tout changement à ces Conditions.
        Si les changements s’avèrent substantiels, nous vous enverrons une
        notification via le Service ou par tout autre moyen afin que vous
        puissiez prendre connaissance des modifications avant de poursuivre
        votre utilisation du Service. Pour continuer à utiliser le Service, vous
        devrez accepter les Conditions mises à jour, sans quoi le Service ne
        vous sera plus disponible.
      </P>

      <H5>16. Communications et Service à la clientèle</H5>
      <P>
        Les avis qu’il est exigé ou permis de donner en vertu des Conditions
        doivent être faits par écrit et seront considérés comme ayant été
        valablement donnés s’ils sont envoyés par courriel ou par courrier
        recommandé aux adresses suivantes :
      </P>
      <UL>
        <LI>
          a) si le destinataire est l’administrateur du MEPP : 5415 Boulevard de
          l’Assomption, Montréal, QC H1T 2M4; courriel&nbsp;:
          <a href="mailto:info@mirroreffectplus.org">
            info@mirroreffectplus.org
          </a>
        </LI>
        <LI>
          b) si le destinataire est l’Utilisateur : à l’adresse courriel fournie
          à MEPP. Toute communication à l’Utilisateur pourra également être
          envoyée par courrier, lorsque disponible.
        </LI>
      </UL>
      <P>
        Les avis et les communications seront réputés avoir été donnés et reçus
        le jour de leur remise ou de leur envoi effectif (ou, si ce jour ne
        tombe pas un jour ouvrable, le jour ouvrable suivant), à moins d’avoir
        été remis ou reçus après 16 h 30, auquel cas ils seront réputés avoir
        été donnés et reçus le jour ouvrable suivant.
      </P>

      <H5>17. Survie</H5>
      <P>
        Les articles 6 (Soumission d’idées), 7 (Exonération de garanties), 8
        (Limitation de responsabilité), 9 (Indemnisation), 12 (Juridiction et
        lois applicables), 13 (Divisibilité), 14 (Renonciation) et 17 (Survie)
        continueront de produire leurs effets à la résiliation ou à l’expiration
        de ces Conditions.
      </P>

      <P>
        <b>
          Pour toute question ou commentaire concernant ces Conditions,
          n’hésitez pas à communiquer avec notre service à la clientèle:
        </b>
      </P>
      <P>
        Courriel&nbsp;:{' '}
        <a href="mailto:info@mirroreffectplus.org">info@mirroreffectplus.org</a>
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

const TermEn = ({ t }) => {
  return (
    <>
      <H3>TERMS OF USE</H3>
      <P>Latest update: December 2021</P>

      <H5>1. Field of application</H5>
      <P>
        These general conditions (hereafter the <b>“Conditions”</b>) constitute
        a legal agreement between you (<b>“you”</b> or the <b>“User”</b>), and
        the MEPP team, also doing business under the name MEPP (<b>“MEPP”</b> or{' '}
        <b>“we”</b>) and regulate the use of the <b>“MEPP”</b>
        platform, including a website and a mobile application (the{' '}
        <b>“Service”</b>).
      </P>
      <P>
        PLEASE READ ALL OF THE CONDITIONS IN DETAIL BEFORE USING THE SERVICE.
      </P>

      <H5>2. Acceptation of the Conditions</H5>
      <P>
        By accepting the Conditions, you accept to be bound, without reserve or
        restriction, by the terms and stipulations of the Conditions. The access
        and use of the Service are subject to the full compliance to these
        Conditions without reserve.
      </P>
      <P>
        If you do not wish to be bound by these Conditions or if you do not
        fully accept them, you must abstain from accessing or using the Service.
      </P>
      <P>
        Subject to these terms and Conditions, MEPP grants you, for the duration
        of the agreement documented by these Conditions:
      </P>
      <UL>
        <LI>
          The right to access the web components of the Service and to use its
          functionalities; and
        </LI>
        <LI>
          A non-transferable, non-exclusive license for (a) personal use, and
          (b) to copy, for download, installation, execution purposes, the
          number of copies for which you are authorized by the application
          download site, on a mobile device that you own or control for your
          personal use and to use it to access and use the Service;
        </LI>
      </UL>

      <H5>3. Copyright</H5>
      <P>
        Excluding images, photos, music, or video files broadcast with the
        mobile application associated to the Service (the “Audiovisual
        content”), which remain the property of their respective beneficiaries,
        the Service and its components are used by MEPP under third-party
        license and may be protected by the laws in matters of intellectual
        property, including the Copyright law (L.R.C. (1985) ch. C-42).
      </P>
      <P>
        In addition to the right to use, which are granted to you in the terms
        of these Conditions, MEPP reserves, in their own name or that of its
        licensors, all its rights regarding the Service. Consequently, it is
        forbidden to copy, reproduce, modify, reformulate, reedit, and more
        generally use the elements composing the Service, both in part and in
        full, without previously obtaining the written authorization of MEPP.
      </P>

      <H5>4. Your obligations</H5>
      <P>
        By using the Service, without limiting the scope of what is otherwise
        prescribed in the Conditions, you accept to (i) respect all the laws
        which are applicable in your territory of residence, (ii) to communicate
        exact information and to update them and (iii) to use the Service in a
        reasonable and responsible manner.
      </P>
      <P>Additionally, you commit to not:</P>
      <UL>
        <LI>a) use the Service for illegal or illicit purposes;</LI>
        <LI>
          b) breach the intellectual property rights of MEPP or others,
          including its licensor, notably the patents, trademarks, trade
          secrets, licenses, copyrights or any other property rights;
        </LI>
        <LI>
          c) monitor the availability, performance or functionality of the
          Service for competition purposes;
        </LI>
        <LI>
          d) use manual coding software, devices, robots or automats or any
          other means to access, decompose, analyze or index the functionalities
          of the Service or any related service, data or information;
        </LI>
        <LI>
          e) transmit destructive code likely to damage, surreptitiously
          intercept or expropriate a system, data or personal information or to
          interfere with them in a detrimental manner;
        </LI>
        <LI>f) contourner toute fonctionnalité de sécurité du Service;</LI>
        <LI>
          g) use the Service for a use for which it is not destined, notably for
          commercial purposes.
        </LI>
      </UL>

      <H5>5. Links to third party sites or resources</H5>
      <P>
        On the Service you may find hyperlinks leading to websites or other
        resources which are not under the control or responsibility of MEPP.
        MEPP does not have any means to control these websites and is not
        accountable for the availability, reliability or legality of such
        websites nor guarantees them. MEPP does not caution nor approve the
        contents which these websites give access to and excludes any
        responsibility and guarantee pertaining to them. The User who accesses
        the third-party Websites does so at their own risk.
      </P>

      <H5>6. Ideas submission</H5>
      <P>
        You acknowledge that your comments, suggestions, ideas or propositions
        pertaining to the Service, its functionalities or commercial activities
        in which MEPP is engaged, that you submit to MEPP (the “Suggestions”),
        are not confidential and may be disclosed, used, adapted or applied by
        eValorix without the obligation of any remuneration or any other form of
        retribution.
      </P>

      <H5>7. Guarantees exemption</H5>
      <P>
        THE SERVICES ARE PROVIDED AS IS. WHEN YOU USE THE SERVICE, YOU
        ACKNOWLEDGE AND AGREE THAT YOU DO SO FULLY AT YOUR OWN RISKS AND PERILS.
        THE SERVICE MAY BE ABANDONED OR ITS ACCESS MAY BE INTERRUPTED AT ANY
        TIME BY MEPP OR OTHERWISE. MEPP DOES NOT FORMULATE ANY DECLARATION OR
        GUARANTEE REGARDING THE SERVICES OR THE FUNCTIONALITIES OFFERED ON THE
        SERVICE, INCLUDING NOTABLY:
      </P>
      <UL>
        <LI>
          A) PERTAINING TO THE EXACTITUDE, EFFICIENCY, AVAILABILITY,
          EXHAUSTIVITY, RELIABILITY, OPPORTUNITY OF THE SERVICE;
        </LI>
        <LI>
          B) PERTAINING TO THE FUNCTIONING OR THE ACCESSIBILITY OF THE SERVICE
          WITHOUT INTERRUPTION OR ERROR;
        </LI>
        <LI>
          C) PERTAINING TO THE CORRECTION OF THE FAULTS OR ERRORS IN THE
          SERVICE;
        </LI>
        <LI>
          D) PERTAINING TO THE ABSENCE OF VIRUS OR DAMAGEABLE ELEMENTS IN THE
          SERVICE;
        </LI>
        <LI>
          E) PERTAINING TO THE SAFE TRANSMISSION OF THE COMMUNICATIONS OR
          WITHOUT INTERCEPTION THROUGH THE SERVICE
        </LI>
      </UL>

      <H5>8. Liability limitations</H5>
      <P>
        TO THE FULL EXTENT PERMITTED BY THE APPLICABLE LAWS, MEPP, ITS LICENSOR,
        THE UNIVERSITY OF MONTREAL (<b>”UdeM”</b>) AND THEIR DIRECTORS,
        ADMINISTRATORS, AGENTS, REPRESENTATIVES, EMPLOYEES, RESEARCHERS,
        STUDENTS, AUTHORIZED REPRESENTATIVES, COMMERCIAL PARTNERS AND THEIR
        RESPECTIVE SUCCESSORS AND BENEFICIARIES CANNOT IN ANY CASE BE HELD
        RESPONSIBLE FOR ANY INDIRECT DAMAGE, OF CONTRACTUAL OR EXTRACONTRACTUAL
        SOURCE (INCLUDING THE NEGLIGENCE) OR OTHERWISE, EVEN IF UdeM KNEW OR
        SHOULD HAVE KNOWN THE POSSIBILITY OF SUCH DAMAGES OR LOSS. IN ADDITION,
        MEPP DOES NOT HAVE ANY OBLIGATION TO KEEP OR STORE THE DATA YOU AMASS
        THROUGH YOUR USE OF THE SERVICE AND CANNOT BE HELD RESPONSIBLE FOR ANY
        LOSS OR DAMAGE RESULTING FROM A LOSS OF THIS DATA.
      </P>
      <P>IF YOU DECIDE TO USE THE SERVICE, YOU DO SO FULLY AT YOUR OWN RISK.</P>
      <P>
        IT IS POSSIBLE FOR THIS ARTICLE TO NOT BE APPLICABLE TO YOU, IN FULL OR
        IN PART, BECAUSE OF A LAW RULING THE CONSUMERS’ RIGHTS OR ANY OTHER
        PUBLIC LAW WHICH MAY BE APPLICABLE TO YOUR SITUATION.
      </P>

      <H5>9. Compensation</H5>
      <P>
        MEPP is not responsible for the actions you take or abstain from taking
        in relation with the Service (your <b>”Actions”</b>).
      </P>
      <P>
        You accept that your Actions are under your sole responsibility and
        acknowledge having taken them with full knowledge of the facts. MEPP
        cannot be deemed responsible of any transgression of the Conditions that
        you have or may have made.
      </P>
      <P>
        Consequently, you accept to compensate and hold harmless MEPP, its
        licensor, UdeM, their branches and affiliated companies, administrators,
        directors, agents, representatives, employees, researchers, students,
        commercial partners, authorized representative and their respective
        successors and rightful claimants in regard to the losses, obligations,
        claims, requests, damages, costs and expenses of any type that may be,
        including the reasonable attorney’s fees, pursuant to your Actions, as
        well as any breach of the Conditions, of any law or of a third party’s
        rights.
      </P>

      <H5>10. Duration and cancelation</H5>
      <P>
        These Conditions take effect on the date on which you accept them (as
        described in the preamble). Notwithstanding what precedes, if you have
        used the Service before the date on which you accepted these Conditions
        (as described in the preamble), you hereby acknowledge and accept that
        these Conditions entered into effect on the date on which you used the
        Service for the first time (which is the oldest and which may be
        anterior to the version date of the Conditions) and will remain in
        effect for as long as you use the Service, unless an end is put to them
        earlier in compliance with the Conditions.
      </P>
      <P>
        We can (a) suspend your rights to use the Service or (b) cancel the
        Conditions, at any time, for any reason, at our sole discretion, without
        or without notice, including if we believe in good faith that you
        neglected your duties in the terms and Conditions. Without limiting what
        precedes, MEPP reserves the right to cancel the usage right granted to
        any user who infringes the copyright of a third party upon notification
        to MEPP by the holder of the copyright or their legal representative.
      </P>
      <P>
        On your side, you may put an end to the agreement which binds you to
        MEPP by requesting for the administrator to close your account on the
        Service and by stopping the use of the mobile application and the web
        components of the Service.
      </P>

      <H5>11. Minors under 16 years old</H5>
      <P>If you are under 16 years old, you cannot use the Service.</P>

      <H5>12. Jurisdiction and applicable laws</H5>
      <P>
        The Conditions are ruled and interpreted by the laws of Quebec and of
        Canada which are applicable, without regard to the laws conflict
        principle.
      </P>
      <P>
        This paragraph does not apply to consumer of the province of Quebec
        (Canada), to whom the <i>Consumer protection</i> law (Quebec) (chapter
        P-40.1) applies. You irrevocably accept and acknowledge the exclusive
        competence of the federal and provincial jurisdiction tribunals, sitting
        in and for the judiciary district of Montreal in relation to any dispute
        arising from the Conditions or related to them, you elect domicile there
        and renounce to any objection founded on the absence of territorial
        competence or any request founded on the <i>non conveniens forum</i>{' '}
        notion.
      </P>

      <H5>13. Divisibility</H5>
      <P>
        Each of the provisions of the Conditions is individual and distinct and
        if, one or the other of the Conditions were deemed invalid, illegal, or
        inapplicable, the other provisions of the Conditions conserve full
        applicability and effect.
      </P>

      <H5>14. Renunciation</H5>
      <P>
        The fact that MEPP does not insist on the full execution of an
        obligation prescribed by these Conditions or does not practice a right
        which is conferred to them will not be considered as a renunciation to
        the execution of this obligation or right. Any renunciation by MEPP to a
        right that is conferred to them in the terms of these Conditions will
        only be applicable if it is established in writing and signed and will
        only be applicable toward the right or the circumstances expressly
        targeted by this renunciation.
      </P>

      <H5>15. Modification</H5>
      <P>
        The Service is a dynamic environment subject to changes. When MEPP, at
        its sole discretion, makes changes to these Conditions, we will modify
        the “Latest update” date as see above. Although it is not our intention
        to frequently or substantially modify these Conditions, it may happen
        that we do it to better serve you in the future or to consider the
        evolution of our services offer, technology and law. We invite you to
        regularly review its content to be aware of any change to these
        Conditions. If changes are substantial, we will send you a notification
        via the Service or any other mean for you to be informed of the
        modifications before continuing your use of the Service. To continue to
        use the Service, you will have to accept the updated Conditions,
        otherwise the Service will no longer be available to you.
      </P>

      <H5>16. Communications and Customer Service</H5>
      <P>
        The notices which are required to or allowed to be given pursuant to the
        Conditions must be sent in writing and will be considered as having been
        validly given if they are sent by Email or registered mail to the
        following addresses:
      </P>
      <UL>
        <LI>
          a) if the recipient is the MEPP administrator: 5415 Boulevard de
          l’Assomption, Montreal, QC H1T 2M4; E-mail:
          <a href="mailto:info@mirroreffectplus.org">
            info@mirroreffectplus.org
          </a>
        </LI>
        <LI>
          b) if the recipient is the User: at the Email addresss provided to
          MEPP. Any communication to the User may also be sent by post when
          available.
        </LI>
      </UL>
      <P>
        The notices and communications will be deemed having been given and
        received on the day of their remittance or their effective expedition
        (or if that day is not a business day, the following day), unless it has
        been remitted or received after 4.30 PM, in which case they will be
        deemed having been given or received on the following business day.
      </P>

      <H5>17. Survival</H5>
      <P>
        Articles 6 (Ideas submission), 7 (Guarantees exemption), 8 (Liability
        limitations), 9 (Compensation), 12 (Jurisdiction and applicable laws),
        13 (Divisibility), 14 (Renunciation) and 17 (Survival) will continue to
        produce their effects upon the cancelation or expiration of these
        Conditions.
      </P>

      <P>
        <b>
          For any question or comment regarding these Conditions, please do not
          hesitate to communicate with our customer service:
        </b>
      </P>
      <P>
        E-mail:{' '}
        <a href="mailto:info@mirroreffectplus.org">info@mirroreffectplus.org</a>
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

export default TermsPage;
