import { useLoaderData } from 'react-router';
import { SubPage, SubSection } from '@/components/layout/SubPage';
import { ProfessorCard, StudentCard } from '@/components/people/PeopleCards';
import cardStyles from '@/components/people/PeopleCards.module.css';
import { ui } from '@/i18n/ui';
import { getMembers } from '@/lib/content';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, await getMembers());
}

export const meta = staticMeta('People');

export default function PeoplePage() {
  const { locale, professors, students } = useLoaderData<typeof loader>();
  return (
    <SubPage title="People">
      <SubSection id="professor-heading" title={ui('professor', locale)}>
        {professors.map((m) => (
          <ProfessorCard key={m.id} member={m} locale={locale} />
        ))}
      </SubSection>
      {students.length > 0 && (
        <SubSection id="students-heading" title={ui('students', locale)}>
          <ul className={cardStyles.studentGrid}>
            {students.map((m) => (
              <li key={m.id}>
                <StudentCard member={m} locale={locale} />
              </li>
            ))}
          </ul>
        </SubSection>
      )}
    </SubPage>
  );
}
