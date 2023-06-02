import { some } from 'lodash';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { SideBar } from '@oliasoft-open-source/react-ui-library';
import { GiOilPump } from 'react-icons/gi';
import { GoSettings } from 'react-icons/go';
import { routes } from 'client/views/navigation/routes/routes';
import {
  isActiveRoute,
  generatePath,
  navigateToPath,
} from 'client/store/navigation/navigation';

interface SectionItem {
  label: string;
  activePaths?: Array<object>;
  path: object;
  icon: ReactNode;
  value: string;
}

interface Section {
  heading: string;
  items: SectionItem[];
}

interface IProjectSideBar {
  sections: Section[];
  navigateToPath: Function;
}

const ProjectSideBar = ({ sections, navigateToPath }: IProjectSideBar) => {
  const { pathname } = useLocation();
  return (
    <SideBar
      top={61}
      options={{
        title: '',
        sections: sections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({
            ...item,
            isActive: item?.activePaths
              ? some(item?.activePaths.map((p) => isActiveRoute(p, pathname)))
              : isActiveRoute(item.path, pathname),
            onClick: () => navigateToPath(generatePath(item.path)),
          })),
        })),
      }}
    />
  );
};

const mapStateToProps = () => {
  const sections = [
    {
      heading: 'Overview',
      items: [
        {
          label: routes.overview.title,
          activePaths: [routes.root, routes.overview],
          path: routes.overview,
          icon: <GiOilPump />,
          value: '#',
        },
        {
          label: routes.example.title,
          path: routes.example,
          icon: <GoSettings />,
          value: '#',
        },
      ],
    },
  ];
  return { sections };
};

const mapDispatchToProps = {
  navigateToPath,
};

const Container = connect(mapStateToProps, mapDispatchToProps)(ProjectSideBar);

export { Container as ProjectSideBar };
