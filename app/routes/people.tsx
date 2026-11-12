import { useLoaderData } from 'react-router';
import { SubPage, SubSection } from '@/components/layout/SubPage';
import { ProfessorCard, StudentCard } from '@/components/people/PeopleCards';
import cardStyles from '@/components/people/PeopleCards.module.css';
import { pick } from '@/i18n/locale';
import { ui } from '@/i18n/ui';
import { getMembers } from '@/lib/content';
import { studentRoleLabels, studentRoleOrder } from '@/lib/labels';
import { staticMeta, withLocale, type LoaderArgs } from '@/lib/route';

export async function loader({ request }: LoaderArgs) {
  return withLocale(request, await getMembers());
}

export const meta = staticMeta('People');

export default function PeoplePage() {
  const { locale, professors, students } = useLoaderData<typeof loader>();
  const groups = studentRoleOrder
    .map((role) => ({ role, members: students.filter((m) => m.role === role) }))
    .filter((g) => g.members.length > 0);
  return (
    <SubPage title="People">
      <SubSection id="professor-heading" title={ui('professor', locale)}>
        {professors.map((m) => (
          <ProfessorCard key={m.id} member={m} locale={locale} />
        ))}
      </SubSection>
      {students.length > 0 && (
        <SubSection id="students-heading" title={ui('students', locale)}>
          <div className={cardStyles.studentGroups}>
            {groups.map(({ role, members }) => (
              <section
                key={role}
                className={cardStyles.studentGroup}
                aria-labelledby={`students-${role}`}
              >
                <h3 id={`students-${role}`} className={cardStyles.groupHeading}>
                  {pick(studentRoleLabels[role], locale)}
                </h3>
                <ul className={cardStyles.studentGrid}>
                  {members.map((m) => (
                    <li key={m.id}>
                      <StudentCard member={m} locale={locale} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </SubSection>
      )}
    </SubPage>
  );
}
