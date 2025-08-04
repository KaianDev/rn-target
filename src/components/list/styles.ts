import { colors, fontFamily, fontSize } from "@/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 72,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    fontSize: fontSize.lg,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  empty: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.regular,
    color: colors.gray[600],
  },
})
